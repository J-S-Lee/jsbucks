const chargeFormContainer = document.querySelector('.js-charge__form');

function chargeCoffee(phone, count) {
  loadMembers();

  const chargeMember = members.map(function(member) {
    member.id === phone
      ? (member.coffee = parseInt(member.coffee) + parseInt(count))
      : member;
  });

  saveMembers();
}

function handleSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const mobile = form.querySelector('.phone__input').value;
  const count = form.querySelector('.count__input').value;

  if (!mobile) {
    modalAlert('휴대폰번호를 입력해주세요.');
    return false;
  }

  if (!count) {
    modalAlert('수량을 입력해주세요.');
    return false;
  }

  loadMembers();
  const member = getMember(mobile);
  console.log(member);
  if (!member) {
    confirm('신규 등록하시겠습니까?') ? newMember(mobile, 1) : '';
  } else {
    chargeCoffee(mobile, count);
    const chargedMember = getMember(mobile);
    paintResult(chargedMember);
  }
}

function paintResult(memberInfo) {
  const resultDiv = document.createElement('div');
  const userSpan = document.createElement('span');
  const coffeeSpan = document.createElement('span');
  const commentSpan = document.createElement('span');

  const form = document.querySelector('phone__input');

  resultDiv.className = 'result__text';
  userSpan.innerHTML = `${memberInfo.id} 님`;
  coffeeSpan.innerHTML = `남은 커피 캡슐은 <strong${
    memberInfo.coffee < 1 ? ' class="redText"' : ''
  }>${memberInfo.coffee}</strong> 개 입니다.`;
  commentSpan.innerHTML = `${
    memberInfo.coffee < 1 ? '충전이 필요합니다.' : '좋은 하루 되세요.'
  }`;

  resultDiv.appendChild(userSpan);
  resultDiv.appendChild(coffeeSpan);
  resultDiv.appendChild(commentSpan);

  chargeFormContainer.removeChild(chargeFormContainer.childNodes[0]);
  chargeFormContainer.appendChild(resultDiv);

  setTimeout(function() {
    chargeFormContainer.removeChild(chargeFormContainer.childNodes[0]);
    paintManagerForm();
  }, 2000);
}

function paintManagerForm() {
  const phoneInput = document.createElement('input');
  const countInput = document.createElement('input');
  const chargeBtn = document.createElement('button');

  phoneInput.placeholder = '010-0000-0000';
  phoneInput.type = 'tel';
  phoneInput.className = 'phone__input';
  phoneInput.pattern = `(010)\\d{8}`;
  phoneInput.required;
  phoneInput.minLength = 11;
  phoneInput.maxLength = 11;

  countInput.placeholder = '수량';
  countInput.type = 'number';
  countInput.className = 'count__input';
  countInput.pattern = `[0-9]{1,2}`;
  countInput.min = 1;
  countInput.max = 99;
  countInput.required;

  chargeBtn.className = 'phone__btn';
  chargeBtn.innerHTML = `<i class="fas fa-cash-register fa-2x"></i>`;

  const chargeForm = document.createElement('form');

  chargeForm.addEventListener('submit', handleSubmit);
  chargeForm.appendChild(phoneInput);
  chargeForm.appendChild(countInput);
  chargeForm.appendChild(chargeBtn);
  chargeFormContainer.appendChild(chargeForm);
}

function init() {
  paintManagerForm();
  return;
}

init();
