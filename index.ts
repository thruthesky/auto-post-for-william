
import * as Nightmare from 'nightmare';
const FacebookUsers = [
    { id: 'thruthesky@hanmail.net', passwrod: 'Asdf99**' }
];

class AutoPost {

    nightmare: Nightmare;

    constructor() {
        this.nightmare = new Nightmare(<any>{
            show: true,
            openDevTools: { mode: 'detach' },
            typeInterval: 20
        });

        
        /// 아래 User Agent 로 접속하면, Firefox 모드로 접속한다.
        /// 이렇게 하면 Site Preview 와 Youtube Preview 가 된다.
        this.nightmare.useragent("Mozilla/5.0 (Macintosh; Intel Mac OS X 10.12; rv:54.0) Gecko/20100101 Firefox/54.0");

    }

    async run() {
        await this.openMFacebook();
        console.log("finished");
    }

    async openMFacebook() {
        /// 모바일 버전의 Facebook 에서 Firefox 로 접속 할 때, Site Preview 가 된다.
        await this.nightmare.goto("https://m.facebook.com")
            .wait('[name="email"]')
            .type('[name="email"]', FacebookUsers[0].id)
            .type('[name="pass"]', FacebookUsers[0].passwrod)
            .click('[name="login"]')
            .wait(2000)
            .goto('https://m.facebook.com/stories.php')
            .wait('textarea')
            .wait(1000)
            .type('textarea', 'https://www.philgo.com/?1273287271')
            .wait(500)
            .click('[name="view_post"]')
            .evaluate(() => {
                
            })
            .then((body) => {
                console.log(body)
            });
    }
}




(new AutoPost()).run();