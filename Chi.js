const fetchFaq = async()=> {
  try {
    const response = await fetch("http://localhost:3000/FAQS");
     if (!response.ok) { // Check if response is okay
                throw new Error("Network response was not ok.");
     }
    const faqData = await response.json();
   const faqContainer= document.getElementById("faqcon");
    //need to loop through every div that would hold the question and answer//
   faqData.forEach((faq)=>{
    const faqHead=document.createElement("div");
    faqHead.classList.add("question");
    //i am going to create h3 and p and icon //
    const head =document.createElement("h3");
    head.textContent=faq.question;
    
    const body = document.createElement("p");
    body.classList.add("answer");
    body.textContent=faq.answer;
    const icon =document.createElement("span")
    icon.classList.add("icons");
    icon.textContent="+";
    //lets begin to append child //
    faqHead.appendChild(head);
    faqHead.appendChild(body);
    faqHead.appendChild(icon);
    //lets apoend faqHwad to faqcontainer//
    faqContainer.appendChild(faqHead);
    //we are going to add event listener to the icon and toggle activity//
    faqHead.addEventListener("click", ()=>{
      faqHead.classList.toggle("active");
      body.classList.toggle("active");
      //because the question has the icon and nit the answer which is the bidy ckasslist//
    icon.textContent =faqHead.classList.contains("active")? "-":"+";
    });
    });
    console.log(faqData);
  } catch(error) {
            console.error("Error fetching faqData:", error); // Log any errors to the console
        }
  };
  document.addEventListener("DOMContentLoaded",fetchFaq);
document.addEventListener("DOMContentLoaded", () => {
  const faqForm = document.getElementById("faqForm");

  faqForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const question = document.getElementById("ques").value;
    const answer = document.getElementById("ans").value;
     try {
      const response = await fetch("http://localhost:3000/FAQSS", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question, answer }),
      });

      if (response.ok) {
        alert("Thank You So Much It Means A Lot To Me,Your FAQ Has Been Added Successfully!");
        // Optionally, clear the form fields
        faqForm.reset();
      } else {
        const errorData = await response.json();
        console.error("Error adding FAQ:", errorData.error);
        alert("Failed to add FAQ.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred while adding the FAQ.");
    }
  });
});
    
