'use strict';

class Title extends Actor {
    constructor(x, y) {
        const hitArea = new Rectangle(0, 0, 0, 0);
        super(x, y, hitArea);
    }

    render(target) {
        const context = target.getContext('2d');
        context.font = '25px sans-serig';
        context.fillStyle = 'white';
        context.fillText('弾幕STG', this.x, this.y);
    }
}

class Fighter extends SpriteActor {
    constructor(x, y) {
        const sprite = new Sprite(assets.get('sprite'), new Rectangle(0, 0, 16, 16));
        const hitArea = new Rectangle(8, 8, 2, 2);
        super(x, y, sprite, hitArea);

        this.speed = 2;
    }

    update(gameInfo, input) {
        if(input.getKey('ArrowUp')) 
		{
			this.y -= this.speed;
			this.sprite.rectangle = new Rectangle(0, 0, 16, 16);
		}
        if(input.getKey('ArrowDown'))
		{
			this.y += this.speed;
			// x,yから何ピクセルの範囲を描画するか
			// 絶対座標じゃなかったわ　すまん
			this.sprite.rectangle = new Rectangle(16, 0, 16, 16);
		}
        if(input.getKey('ArrowLeft')) {
			this.x -= this.speed;
			this.sprite.rectangle = new Rectangle(32, 0, 16, 16);
		}
        if(input.getKey('ArrowRight')) { 
			this.x += this.speed;
			this.sprite.rectangle = new Rectangle(48, 0, 16, 16);
		}
    }
}

class DanmakuStgMainScene extends Scene {
    constructor(renderingTarget) {
        super('メイン', 'black', renderingTarget);
        const fighter = new Fighter(150, 300);
        this.add(fighter);
    }
}

class DanmakuStgTiteScene extends Scene {
    constructor(renderingTarget) {
        super('タイトル', 'black', renderingTarget);
        const title = new Title(100, 200);
        this.add(title);
    }

    update(gameInfo, input) {
        super.update(gameInfo, input);
        if(input.getKeyDown(' ')) {
            const mainScene = new DanmakuStgMainScene(this.renderingTarget);
            this.changeScene(mainScene);
        }
    }
}

class DanmakuStgGame extends Game {
    constructor() {
        super('弾幕STG', 300, 400, 60);
        const titleScene = new DanmakuStgTiteScene(this.screenCanvas);
        this.changeScene(titleScene);
    }
}

assets.addImage('sprite', 'sprite.png');
assets.loadAll().then((a) => {
    const game = new DanmakuStgGame();
    document.body.appendChild(game.screenCanvas);
    game.start();
});