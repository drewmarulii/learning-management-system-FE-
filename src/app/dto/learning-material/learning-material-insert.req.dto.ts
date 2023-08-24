import { AttachmentMaterialInsertReqDto } from "./attachment-material-insert.req.dto"

export interface LearningMaterialInsertReqDto {
    materialName : string 
    materialText : string 
    learningId : number 
    attachments : AttachmentMaterialInsertReqDto[]
}