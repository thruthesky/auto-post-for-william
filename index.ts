/**
 * @see README
 */
import * as Nightmare from 'nightmare';
import { config } from './config';
class AutoPost {

    nightmare: Nightmare;

    constructor() {
        this.nightmare = new Nightmare(<any>{
            show: true,
            openDevTools: { mode: 'detach' },
            typeInterval: 20
        });


        this.resetNightmare();
    }
    resetNightmare() {
        /// 아래 User Agent 로 접속하면, Firefox 모드로 접속한다.
        /// 이렇게 하면 Site Preview 와 Youtube Preview 가 된다.
        this.nightmare.useragent("Mozilla/5.0 (Macintosh; Intel Mac OS X 10.12; rv:54.0) Gecko/20100101 Firefox/54.0");
    }

    async run() {
        await this.openMFacebook();
        console.log("finished");
    }

    async post(url) {
        return await this.nightmare
            .goto(url)
            .wait(2000)
            .wait('textarea')
            .wait(1000)
            .type('textarea', 'http://www.philgo.com/?1273287271')
            .wait(500)
            .click('[name="view_post"]')
            .wait(1000)
            .evaluate(() => {

            })
            .then(() => {
                console.log('url: ', url);
            });
    }

    async openMFacebook() {
        /// 모바일 버전의 Facebook 에서 Firefox 로 접속 할 때, Site Preview 가 된다.
        await this.nightmare.goto("https://m.facebook.com")
            .wait('[name="email"]')
            .type('[name="email"]', config.facebookAccount.id)
            .type('[name="pass"]', config.facebookAccount.passwrod)
            .click('[name="login"]')
            .wait('img[alt*="Nam"]')
            .evaluate(() => { })
            .then(() => { });


        if (config.postInWall) {
            await this.post('https://m.facebook.com/stories.php');
        }

        if (config.groups && config.groups.length) {
            for (let groupUrl of config.groups) {
                await this.post( groupUrl );
            }
        }
    }
}




(new AutoPost()).run();