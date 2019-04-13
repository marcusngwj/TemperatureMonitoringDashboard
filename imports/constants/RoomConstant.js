// Map to the class names in room.scss
export const ROOM_COLOR = {
  WHITE: 'room-background-white',
  DARK_BLUE: 'room-background-darkBlue',
  LIGHT_BLUE: 'room-background-lightBlue',
  GREY: 'room-background-grey',
  RED: 'room-background-red'
};

export const ROOM_ID = ['room0', 'room1', 'room2', 'room3', 'room4', 'room5', 'room6'];

export const getRoomIndexFromId = (roomId) => {
  return roomId.slice(-1);
}