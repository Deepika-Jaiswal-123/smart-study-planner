const sub = document.getElementById("subject");
const start = document.getElementById("startTime");
const end = document.getElementById("endTime");
const Btn = document.querySelector(".add-btn");
const timeline = document.getElementById("timeline-view");
const DateInput = document.getElementById("date");
const day = document.getElementById("day");

function fun(sessionValue) {
  const sessionDiv = document.createElement("div");
  sessionDiv.className = "session";
  const para = document.createElement("span");
  para.innerText = `${sessionValue.subject} | ${sessionValue.date} | ${sessionValue.day} ${sessionValue.start} | ${sessionValue.end}`;

  const del = document.createElement("button");
  del.innerText = "Delete";
  del.className = "del-btn";
  del.addEventListener("click", (e) => {
    sessionDiv.remove();
  });
  sessionDiv.appendChild(para);
  sessionDiv.appendChild(del);
  timeline.appendChild(sessionDiv);
  sub.value = "";
  DateInput.value = "";
  day.value = "";
  start.value = "";
  end.value = "";
}

let sessions = JSON.parse(localStorage.getItem("sessions")) || [];
console.log(sessions);
sessions.forEach((el) => {
  fun(el);
});

  Btn.addEventListener("click", (e) => {
    e.preventDefault();
    if (
      sub.value === "" ||
      start.value === "" ||
      end.value === "" ||
      DateInput.value === "" ||
      day.value === ""
    ) {
      alert("Please fill all the fields");
      return;
    }
    const newValueToAdd = {
      subject: sub.value,
      date: DateInput.value,
      day: day.value,
      start: start.value,
      end: end.value,
    };
    fun(newValueToAdd);
    sessions.push(newValueToAdd);
    localStorage.setItem("sessions", JSON.stringify(sessions));
  });


// Reminder functionality
  function checkReminders() {
  const now = new Date();
  sessions.forEach(session => {
    const sessionTime = new Date(`${session.date}T${session.start}`);
    if (
      sessionTime.getHours() === now.getHours() &&
      sessionTime.getMinutes() === now.getMinutes()
    ) {
      new Notification(`Reminder: ${session.subject} starts now!`);
    }
  });
}
setInterval(checkReminders, 60000); // check every minute
