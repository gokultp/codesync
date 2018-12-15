export default class SockClient{
    constructor(url){
        this.conn = new WebSocket(url);
    }

    suscribe(cb){
        this.conn.onmessage = cb;
    }

    publish(msg){
        this.conn.send(JSON.stringify(msg));
    }
}