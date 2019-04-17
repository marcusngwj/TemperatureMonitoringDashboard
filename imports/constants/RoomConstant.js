// Map to the class names in room.scss and legendcolorboxstyle.scss
export const ROOM_COLOR = {
  WHITE: 'room-background-white',
  GREY: 'room-background-grey',
  RED: 'room-background-red',
  DARK_BLUE: 'room-background-darkBlue',
  MEDIUM_BLUE: 'room-background-mediumBlue',
  LIGHT_BLUE: 'room-background-lightBlue'
};

export const ROOM_ID = ['room0', 'room1', 'room2', 'room3', 'room4', 'room5', 'room6'];

export const getRoomIndexFromId = (roomId) => {
  return roomId.slice(-1);
}