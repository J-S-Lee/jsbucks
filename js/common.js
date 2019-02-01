const MEMBERS_LS = 'members';
const formContainer = document.querySelector('.js-form');

let members = [];

function saveMembers() {
  localStorage.setItem(MEMBERS_LS, JSON.stringify(members));
}

function loadMembers() {
  const loadedMembers = localStorage.getItem(MEMBERS_LS);
  if (loadedMembers !== null) {
    const parsedMembers = JSON.parse(loadedMembers);
    members = parsedMembers;
  }
}

function getMember(phone) {
  const orderer = members.filter(function(member) {
    return member.id === phone;
  });
  return orderer[0];
}

function newMember(phone, count) {
  members.push({ id: phone, coffee: count });
  saveMembers();
  alert(`${phone}님 등록 완료!`);
}

function init() {
  return;
}

init();
