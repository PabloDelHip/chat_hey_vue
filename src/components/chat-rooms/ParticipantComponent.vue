<template>
    <div id="plist" class="people-list">
                <div class="input-group text-center">
                    <h5 >Participantes</h5>
                </div>
                <hr>
                <div>
                    <ul v-for="participant in participants" :key="participant._id" class="list-unstyled chat-list mt-2 mb-0">
                        <li class="clearfix active">
                            <div class="about">
                                <div class="name">{{ participant.user_name }}</div>
                                <div class="status"> <i class="fa fa-circle online"></i> online </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
</template>

<script>
import io from 'socket.io-client';
export default {
    name: "chatRoom",
    data () {
        return {
            participants: [],
            socket: io()
        }
    },
    sockets: {
        get_participants(data) {
            this.participants = data
        }
    },
    mounted() {
        this.socket.on('get_participants');
    }

}
</script>