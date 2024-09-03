const api_key = "pk_test_f446c7c77b0aaddbfb9292e3be1b657392ae63a5";

// Get the form and pay button elements
const form = document.querySelector("form");
const payBtn = document.getElementById("pay-btn");

// Add event listener to the pay button
payBtn.addEventListener("click", (e) => {
  e.preventDefault();

  // Get the form data
  const fName = document.getElementById("f_name").value;
  const lName = document.getElementById("l_name").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("tel").value;
  const amount = document.getElementById("amount").value;

  // Validate form data
  let errorMessage = "";
  if (!fName) {
    errorMessage += "First name, ";
  }
  if (!lName) {
    errorMessage += "Last name, ";
  }
  if (!email) {
    errorMessage += "Email address, ";
  }
  if (!phone) {
    errorMessage += "Phone number, ";
  }
  if (!amount) {
    errorMessage += "Amount, ";
  }

  if (errorMessage) {
    alert("Please fill in the following fields: " + errorMessage.slice(0, -2));
  } else {
    // Initialize PayStack payment
    payWithPaystack(fName, lName, email, phone, amount);
  }
});

// PayStack payment function
function payWithPaystack(fName, lName, email, phone, amount) {
  const handler = PaystackPop.setup({
    key: api_key,
    email: email,
    amount: amount * 100,
    currency: "GHS",
    ref: `py-${Math.floor(Math.random() * 1000000000)}`,
    metadata: {
      custom_fields: [
        {
          display_name: "First Name",
          variable_name: "first_name",
          value: fName,
        },
        {
          display_name: "Last Name",
          variable_name: "last_name",
          value: lName,
        },
        {
          display_name: "Phone Number",
          variable_name: "phone_number",
          value: phone,
        },
      ],
    },

    callback: (response) => {
      // Upon successful payment
      if (response.status === "success") {
        alert("Payment successful");
        form.reset();
      } else {
        alert("Payment failed");
      }
    },
    onClose: () => {
      // Payment cancelled
      alert("This will cancel your payment");
    },
  });

  // Open PayStack payment modal
  handler.openIframe();
}
