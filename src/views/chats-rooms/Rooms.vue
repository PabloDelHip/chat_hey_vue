<template>
    <div>
        <RoomsComponent/>
    </div>
</template>

<script>
    import RoomsComponent from '../../components/chat-rooms/RoomComponent';

    export default {
        name: 'rooms',
        components: {
            RoomsComponent
        },
    }
</script>