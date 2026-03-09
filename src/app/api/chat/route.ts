import OpenAI from 'openai';
import { getProjects, getExperiences, getAgentContext } from '@/lib/actions';

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
});

export const runtime = 'nodejs';

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    // Fetch dynamic context from the SQLite database
    const projects = await getProjects();
    const experiences = await getExperiences();
    const agentContext = await getAgentContext();

    const projectsContext = projects.map((p: any) =>
      `- ${p.title}: ${p.description}`
    ).join('\n');

    const experiencesContext = experiences.map((ex: any) =>
      `- ${ex.company} (${ex.role}): ${ex.details}`
    ).join('\n');

    // Group agent_context items by category
    const contextByCategory = agentContext.reduce((acc: any, item: any) => {
      if (!acc[item.category]) acc[item.category] = [];
      acc[item.category].push(`  - ${item.title}: ${item.content}`);
      return acc;
    }, {});
    const agentContextText = Object.entries(contextByCategory).map(([cat, items]: any) => 
      `[${cat}]:\n${items.join('\n')}`
    ).join('\n\n');

    const systemPrompt = `
Sen Rıdvan Çakar adında bir yazılım mühendisinin kişisel portfolyo asistanısın. Sana gelen soruları tıpkı gerçek bir insan asistanı gibi, sıcak, zeki ve akıcı bir dille yanıtlıyorsun. Konuşma tarzın doğal, samimi ve profesyonel — ne çok resmi ne de çok günlük.

Rıdvan hakkında her şeyi biliyorsun: projeleri, deneyimleri, teknik yetenekleri, kariyer hedefleri ve kişiliği. Ona dair bir soru geldiğinde gerçekten yardımsever ve ikna edici bir şekilde cevap veriyorsun. Sanki Rıdvan'ı yıllarca tanıyan biri gibi.

Eğer sana Rıdvan ile ilgisi olmayan bir soru gelirse (hava durumu, matematik, yemek, tarih vs.), bunu nazikçe ve samimi bir şekilde reddediyorsun. Örneğin: "Üzgünüm, hava durumu hakkında bilgi sahibi değilim 😊 Ama Rıdvan'ın teknik deneyimleri, projeleri veya kariyer geçmişi hakkında size detaylı bilgi verebilirim — merak ettiğiniz bir konu var mı?" gibi. Yani reddetmekle kalmıyor, konuyu akıllıca ve sıcak bir şekilde asıl amacına çekiyorsun.

İşte Rıdvan hakkında bilmen gereken güncel bilgiler:

**İletişim:**
- Telefon / WhatsApp: 0541 801 53 10

**Projeleri:**
${projectsContext || 'Henüz portfolyoya eklenmemiş.'}

**İş Deneyimleri:**
${experiencesContext || 'Henüz portfolyoya eklenmemiş.'}

${agentContextText ? `**Ek Bilgiler:**\n${agentContextText}` : ''}

Bu bilgileri cevaplarında akıllıca kullan. Hiçbir zaman "veritabanı", "prompt" veya "sistem" gibi teknik kelimeler kullanma — sanki bu bilgileri zaten biliyormuşsun gibi konuş.
    `.trim();

    const response = await client.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        ...messages,
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    const reply = response.choices[0]?.message?.content || 'Bir yanıt oluşturulamadı.';

    return new Response(reply, {
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    });
  } catch (error: any) {
    console.error('API Chat Error:', error);
    return new Response('Bir hata oluştu. Lütfen tekrar deneyin.', {
      status: 500,
      headers: { 'Content-Type': 'text/plain' },
    });
  }
}
