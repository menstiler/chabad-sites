function getElementValue(field) {
  const td = Array.from(document.querySelectorAll("td")).find(
    (el) => el.textContent.trim() === field
  );

  if (td) {
    const row = td.parentElement;
    const sibling = Array.from(row.children).find((el) => el !== td);

    if (sibling) {
      return sibling.textContent.trim();
    } else {
      console.log("No sibling <td> found.");
    }
  } else {
    console.log(`<td> with text ${field} not found.`);
  }
}

async function sendToSheet() {
  let amount = getElementValue(SELECTORS.totalAmountField);
  let dedication = getElementValue(SELECTORS.dedicationField);
  let submissionId = getElementValue(SELECTORS.submissionIdField);
  let anonymous = getElementValue(SELECTORS.anonymousField);
  let displayName = getElementValue(SELECTORS.displayNameField);

  if (anonymous && anonymous === "Donate anonymously") {
    displayName = "Anonymous";
  }

  if (submissionId === localStorage.getItem("submissionId")) {
    getFromSheet();
    return;
  }

  let data = {
    displayName,
    amount,
    dedication,
    submissionId,
  };

  try {
    const res = await fetch(url, {
      method: "POST",
      mode: "no-cors", // Important for avoiding CORS issues
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    console.log("Data sent");
    localStorage.setItem("submissionId", submissionId);
    getFromSheet(true);
  } catch (err) {
    console.error("Error:", err);
  }
}

if (document.readyState !== "loading") {
  sendToSheet();
} else {
  document.addEventListener("DOMContentLoaded", sendToSheet);
}
