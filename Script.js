const fetchFaq = async () => {
  try {
    const response = await fetch("http://localhost:3000/FAQS");
    console.log("Fetch request sent.");

    if (!response.ok) {
      throw new Error("Network response was not ok.");
    }

    const faqData = await response.json();
    console.log("FAQ data received:", faqData);

    const faqContainer = document.getElementById("faqcon");
    if (!faqContainer) {
      console.error("faqContainer not found");
      return;
    }

    faqData.forEach((faq) => {
      const faqHead = document.createElement("div");
      faqHead.classList.add("question");

      const head = document.createElement("h3");
      head.textContent = faq.question;

      const body = document.createElement("p");
      body.classList.add("answer");
      body.textContent = faq.answer;
      body.style.display = "none"; // Initially hide the answer

      // Create the icon
      const icon = document.createElement("span");
      icon.classList.add("icon");
      icon.textContent = "+"; // Default icon

      // Append elements to faqHead
      faqHead.appendChild(head);
      faqHead.appendChild(icon);
      faqHead.appendChild(body);
      faqContainer.appendChild(faqHead);

      // Add event listener to toggle answer visibility and icon text
      faqHead.addEventListener("click", () => {
        const isVisible = body.style.display === "block";
        body.style.display = isVisible ? "none" : "block";
        icon.textContent = isVisible ? "+" : "-"; // Toggle icon text
      });

      console.log("FAQ item appended:", faq);
    });
  } catch (error) {
    console.error("Error fetching FAQ data:", error);
  }
};

document.addEventListener("DOMContentLoaded", fetchFaq);