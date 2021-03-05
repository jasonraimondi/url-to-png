
import { HttpException, HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { URLSearchParams } from 'url';

@Injectable()
export class AllowListMiddleware implements NestMiddleware {
    private allowList: string[] = []
    // https://stackoverflow.com/questions/3809401/what-is-a-good-regular-expression-to-match-a-url
    private isUrlRegexp = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/

    constructor() {
        this.allowList = process.env.ALLOW_LIST.split(',').map(x => x.trim())
    }

    use(req: Request, res: Response, next: NextFunction) {
        // skip `/?`
        const splitedURL = req.url.split('?')
        if (splitedURL.length !== 2) {
            throw new HttpException(`Invalid URL: ( ${req.url} )`, HttpStatus.BAD_REQUEST);
        }

        const requestURL = (new URLSearchParams(splitedURL[1])).get('url')
        if (!requestURL) {
            throw new HttpException('url is required', HttpStatus.BAD_REQUEST);
        }

        if (!this.isUrlRegexp.test(requestURL)) {
            throw new HttpException(`Invalid URL: ( ${requestURL} )`, HttpStatus.BAD_REQUEST);
        }

        // goto next directly if allowlist is empty
        if (this.allowList.length === 0) {
            return next();
        }

        const found = this.allowList.findIndex(x => requestURL.includes(x));
        if (found === -1) {
            throw new HttpException(`url (${requestURL}) must in allow list`, HttpStatus.FORBIDDEN);
        }

        next();
    }
}
