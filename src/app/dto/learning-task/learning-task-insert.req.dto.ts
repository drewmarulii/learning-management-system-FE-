import { QuestionInsertReqDto } from "@dto/question/question-insert.req.dto"

export interface LearningTaskInsertReqDto {
    learningId : number
    startDateTime : string 
    endDateTime : string
    questions : QuestionInsertReqDto[]
}