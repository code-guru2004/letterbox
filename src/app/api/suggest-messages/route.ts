import { chatSession } from "../../../../utils/GeminiAI";

export async function POST() {
    try {
        const prompt =
            "Generate short, funny messages with Indian cultural humor. Include references to daily life, typical Indian behavior, Bollywood drama, relatives, desi phrases, or common situations like late replies, overdramatic friends, or nosy aunties. The tone should be witty, sarcastic, and relatable for Indian audiences. Use Hinglish (Hindi + English) where it adds humor. Each question should be separated by '||'."
            + "For example, your output should be structured like this: 'Tumhare questions sunke toh Google bhi sochta hai, Yeh kya kar diya maine? || Thoda muskurao yaar, zindagi mein tension lene ka kaam toh relatives already kar rahe hain.|| Arre bhai, calm down! Itna drama toh daily soaps mein bhi nahi hota. Ekta Kapoor just took notes." ;

        const aiResponse = await chatSession.sendMessage(prompt);
        const JSONres = (aiResponse.response.text()).replace('```json', '').replace('```', '');
        //console.log(JSONres);


        // Step 2: Parse the JSON string to get the array
        const parsedArray = JSON.parse(JSONres);

        // Step 3: Split the string in the array by "||"
        const suggestMessageArray = parsedArray[0].split("||");

        return Response.json({
            success: true,
            message: "Get AI messages successfully",
            suggestMessages: suggestMessageArray
        })

    } catch (error) {
        return Response.json({
            success: false,
            message: "not Get ai message"
        })
    }
}