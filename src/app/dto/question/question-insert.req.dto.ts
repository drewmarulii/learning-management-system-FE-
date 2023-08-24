import { AttachmentQuestionInsertReqDto } from "./attachment-question-insert.req.dto"

export interface QuestionInsertReqDto {
    questionDetail : string 
    typeId : number
    files : AttachmentQuestionInsertReqDto[] 
}