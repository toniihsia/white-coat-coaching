export const createSignupEmail = (email, success, error) => {
  $.ajax({
    type: 'POST',
    url: 'api/signup_emails',
    data: email,
    success,
    error
  });
};
