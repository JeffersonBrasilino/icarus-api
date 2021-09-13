import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import {NestExpressApplication} from "@nestjs/platform-express";

export class SwaggerGenerateDocumentation {
    private _title: string = 'Icarus API';
    private _description: string = 'API em node do Icarus';
    private _app: NestExpressApplication

    constructor(app: NestExpressApplication) {
        this._app = app;
    }

    set title(title: string) {
        this._title = title;
    }

    set description(description: string) {
        this._description = description;
    }

    generate(path?) {
        const config = new DocumentBuilder()
            .setTitle(this._title)
            .setDescription(this._description)
            .setVersion('2.0')
            .addBearerAuth()

        const document = SwaggerModule.createDocument(this._app, config.build());

        SwaggerModule.setup(path ? path : 'docs', this._app, document, {
            //customCss: `.topbar-wrapper img {content:url('../assets/img/lbglogo.png'); width:300px; height:auto;}.swagger-ui .topbar { background-color: white; }`
            customCss:'.topbar{display:none}',
            customSiteTitle: this._title,
            customfavIcon:''
        })
    }

}
