export interface AttachmentsOptions {
    path?: string,
    filename?: string,
    content?: string,
    contentType?: string,
    encoding?: string,
    raw?: string,
    cid?:string
}

export interface SendEmailOptions {
    subject: string,
    to: string | string[],
    from: string,
    text?: string
    body?: string,
    html?:string,
    attachments?: AttachmentsOptions[]
}

export interface IsendEmail {
    sendEmail(settings: SendEmailOptions): Promise<any>;
}