import { QuestionAnswerPair } from './question-answer-pair';
export class CompletedTest {

    name: String; // the name of the assesment test completed
    description: String; // description takes from the assessment form 
    userToken: String; // the link to the user, using token because its alrd in the users session
    // that way we dont have to do a get for the users info just to get the email
    
    results: QuestionAnswerPair[]; 
}
