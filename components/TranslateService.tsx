export async function translateText(text: string, targetLanguage: string, apiKey: string): Promise<string> {
    try {
        const response = await fetch(
            `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    q: text,
                    target: targetLanguage,
                }),
            }
        );

        const data = await response.json();
        return data.data.translations[0].translatedText;
    } catch (error) {
        console.error('Translation error:', error);
        return text;
    }
}