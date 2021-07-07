<template>
    <div class="chat">                        
                <div class="chat-header clearfix">
                    <div class="row" >
                        <div class="col-lg-6">
                            <div class="chat-about">
                                <h6 class="m-b-0">YOUR USER IS: {{ user_name }}</h6>
                            </div>
                            <br>
                            <div>
                                <hr>
                                <label>Search message</label>
                                <input type="text" class="form-control form-control-sm" v-model="message_to_search">
                                <a class="btn btn-primary btn-sm mt-2" :href="`#${search_message[pos_mensaje]}`" @click="buscarMensaje">
                                    <i class="fas fa-search"></i> Search
                                </a>
                                <span class="number-message">number of matching messages: {{numMessages}} </span>
                            </div>
                            <a class="p-2 button-search" :href="`#${search_message[pos_mensaje]}`" @click="updatePositionMessage(false)">
                               <i class="fas fa-arrow-left"></i> Previous
                            </a>
                            <a class="p-2 button-search" :href="`#${search_message[pos_mensaje]}`" @click="updatePositionMessage">
                               <i class="fas fa-arrow-right"></i> Next
                            </a>
                        </div>
                    </div>
                </div>
                <div class="chat-history" ref="container">
                    <ul class="m-b-0" v-for="item in conversation" :key="item.date">
                        <li :class="[clearfix, item.user_name === user_name ? textRight : '']" :id="item.createdAt">
                            <div v-if="item.user_name != user_name">
                                <span class="message-user-name">User name: </span>
                                <span class="message-name">{{ item.user_name }}</span>
                            </div>
                            <div class="message-data">
                                <span class="message-data-time">{{ item.createdAt | moment("lll") }}</span>
                            </div>
                            <div v-if="item.type === 'text'" class="message other-message "> <span>{{ item.text }}</span> </div>
                            <div v-else class="message other-message ">
                                 <img :src="item.url" style="width: 100%">
                            </div>
                           
                        </li>
                    </ul>
                </div>
                <div class="chat-message clearfix">
                    <span class="invalid" :style="{display: activeError}">you need to send text</span>
                    <div class="input-group mb-0">
                        <div class="input-group-prepend">
                            <span class="input-group-text"><i class="fas fa-paper-plane"></i></span>
                        </div>
                        <div class="fa-2x" v-if="show_spinner">
                                <i class="fas fa-spinner fa-spin"></i>
                            </div>
                            <label v-else class="custom-file-upload">
                                <input type="file" name="image" @change="sendImage" accept="image/*">
                                <i class="fa fa-image"></i>
                                
                            </label>
                        <input
                            name="message"
                            v-validate="'required'"
                            type="text"
                            class="form-control"
                            v-model="message"
                            @keyup.enter="sendMessage('text')"
                            placeholder="Enter text here...">                                  
                    </div>
                </div>
            </div>
</template>

<script>
import io from 'socket.io-client';
import { mapState } from 'vuex'
import Chat from '../../providers/chat';
import { storage } from './../../firebase'
const ref = storage.ref()

const chatResource = new Chat();

export default {
    name: "chatRoom",
    data () {
        return {
            message: '',
            conversation: [],
            search_message: [],
            user: '',
            clearfix: 'clearfix',
            textRight: 'text-right',
            socket: io(),
            activeError: 'none',
            image: '',
            url: '',
            show_spinner: false,
            message_to_search: '',
            pos_mensaje: 0
        }
    },
    computed: {
       ...mapState(['user_name']),
       numMessages() {
           return this.search_message.length;
       }
    },
    methods: {
        buscarMensaje() {
            this.message_to_search = this.message_to_search.toUpperCase()

            this.search_message = this.conversation.filter(conversation => {
                if(conversation.text) {
                    const text = conversation.text.toUpperCase()
                    return text.includes(this.message_to_search)
                }
            }).map((conversation) => {
                return conversation.createdAt
            });
            this.pos_mensaje = 0
        },
        updatePositionMessage(suma = true) {
            if(suma) {
                if(this.pos_mensaje === this.search_message.length-1) {
                    this.pos_mensaje = 0
                }
                else{
                    this.pos_mensaje++
                }
            }
            else {
                if(this.pos_mensaje === 0) {
                    this.pos_mensaje = this.search_message.length-1
                }
                else{
                    this.pos_mensaje--
                }
            }
        },
        sendMessage(type, url = '') {
            const dataSave = {
                user_name: this.user_name,
                type,
                text: this.message,
                url
            }
            if(type === 'image') {
                delete dataSave.text;
            }
            else {
                delete dataSave.url;
            }
            if(this.message === '' && type === 'text') {
                this.activeError = 'block' 
            }
            else {
               this.$socket.emit('chat_message', dataSave, (response) => {
                    if(response.data.status === 500) {
                        alert('error sending message')
                    }
                }) 
            }
        },
        sendImage(event){
            const self = this
            self.show_spinner = true
            this.image = event.target.files[0];
            const refImg = ref.child(`imagenes/${this.image.name}`)
            const metadata = { contentType: 'img/jpeg'}
            refImg.put(this.image, metadata)
                .then(image => {
                    image.ref.getDownloadURL().then(function(downloadURL) {
                        self.sendMessage('image', downloadURL)
                        self.show_spinner = false
                    });
                })
        },
        endDiv() {
            let content = this.$refs.container;
            content.scrollTop = content.scrollHeight;
            this.activeError= 'none'
        },
        async getAllMessages() {
            const {data} = await chatResource.getAllMessages()
            this.conversation = data.data
            setTimeout(this.endDiv, 50);
        }

    },
    sockets: {
        get_message(data) {
            this.conversation.push({
                createdAt: Date.now(),
                text: data.text,
                type: data.type,
                user_name: data.user_name,
                url: data.url
            })
            this.message = ''
            setTimeout(this.endDiv, 50);
        }
    },
    mounted () {
        this.$socket.emit('connected_room', {
          user_name: this.user_name
        }, (response) => {
            if(response.data.status === 500) {
                alert('failed to connect')
            }
        });
        this.socket.on('get_message');
        this.getAllMessages()
    }

}
</script>