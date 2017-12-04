const mongo = require('mongodb').MongoClient;
const client = require('socket.io').listen(4000).sockets;


mongo.connect('mongodb://127.0.0.1/chatapp',function(err,db){
     if (err) {
        throw err;
      } 
       console.log('Working');


       
       // connect to socket
    client.on('connection', function(socket){
      
      
    let chat = db.collection('chats');



    //create function to send status
    sendStatus = function(s) {
      socket.emit('status',s);
    }



    //get chat
    chat.find().limit(100).sort({_id:1}).toArray(function(err,res){
      if (err) {
        throw err;
      } 

      
        //emit messages
        socket.emit('output',res);

    });



    //handling input events
    socket.on('input',function(data){
      let name = data.name;
      let message = data.message;



      //checking if insert is empty
      if (name === ''|| message === '') {
        sendStatus('please enter message');



        //if not then insert message
      } else {
        chat.insert({name:name,message:message},function(){
          client.emit('output',[data]);

          sendStatus({
            message:'Message deliveredf',
            clear:true

          });

        });
      }


    });

    socket.on('clear',function(data){
      chat.remove({},function(){
        socket.emit('cleared');
      })
    })

  });
});