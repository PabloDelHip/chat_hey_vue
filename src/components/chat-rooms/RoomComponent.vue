<template>
    <div class="container">
        <h1 class="text-center mt-3">CHAT ROOM HEY!!</h1>
        <div class="row clearfix">
            <div class="col-lg-12">
                <div class="card chat-app">
                    <ParticipantsComponent/>
                    <ChatComponent/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import ParticipantsComponent from './ParticipantComponent';
    import ChatComponent from './ChatComponent';
    export default {
        name: 'rooms',
        components: {
            ParticipantsComponent,
            ChatComponent
        },
        mounted() {
            
        }
    }
</script>