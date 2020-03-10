document.getElementById('issueInputForm').addEventListener('submit', submitIssue);

function submitIssue(e) {
  const i = document.getElementById("issueNo").innerText;
  const iNumber = parseFloat(i);
  document.getElementById("issueNo").innerText = iNumber + 1;
  const getInputValue = id => document.getElementById(id).value;
  const description = getInputValue('issueDescription');
  const severity = getInputValue('issueSeverity');
  const assignedTo = getInputValue('issueAssignedTo');
  const id = Math.floor(Math.random() * 100000000) + '';
  const status = 'Open';

  const issue = { id, description, severity, assignedTo, status };
  let issues = [];
  if (localStorage.getItem('issues')) {
    issues = JSON.parse(localStorage.getItem('issues'));
  }
  issues.push(issue);
  localStorage.setItem('issues', JSON.stringify(issues));

  document.getElementById('issueInputForm').reset();
  fetchIssues();
  e.preventDefault();
}

function setStatusClosed(id) {
  const issues = JSON.parse(localStorage.getItem('issues'));
  const currentIssue = issues.find(issue => issue.id == id);
  currentIssue.status = 'Closed';
  currentIssue.description = document.getElementById("description").style.display = `<del>` + currentIssue.description + `</del>`;
  const j = document.getElementById("closedIssue").innerText;
  const jNumber = parseFloat(j);
  document.getElementById("closedIssue").innerText = jNumber + 1;
  const i = document.getElementById("issueNo").innerText;
  const iNumber = parseFloat(i);
  document.getElementById("issueNo").innerText = iNumber - 1;

  localStorage.setItem('issues', JSON.stringify(issues));
  fetchIssues();
}
function deleteIssue(id) {
  const issues = JSON.parse(localStorage.getItem('issues'));
  const remainingIssues = issues.filter(issue => issue.id == id);
  // localStorage.removeItem = remainingIssues;
  //  console.log(issues.filter(issue => issue.id == id));
  issues.splice(remainingIssues, 1);
  const i = document.getElementById("issueNo").innerText;
  const iNumber = parseFloat(i);
  document.getElementById("issueNo").innerText = iNumber - 1;

  localStorage.setItem('issues', JSON.stringify(issues));
  fetchIssues();
}

const fetchIssues = () => {
  const issues = JSON.parse(localStorage.getItem('issues'));
  const issuesList = document.getElementById('issuesList');
  issuesList.innerHTML = '';

  for (var i = 0; i < issues.length; i++) {
    const { id, description, severity, assignedTo, status } = issues[i];

    issuesList.innerHTML += `<div class="well">
                              <h6>Issue ID: ${id} </h6>
                              <p><span class="label label-info"> ${status} </span></p>
                              <h3 id="description"> ${description} </h3>
                              <p><span class="glyphicon glyphicon-time"></span> ${severity}</p>
                              <p><span class="glyphicon glyphicon-user"></span> ${assignedTo}</p>
                              <a href="#" onclick="setStatusClosed(${id})" class="btn btn-warning">Close</a>
                              <a href="#" onclick="deleteIssue(${id})" class="btn btn-danger">Delete</a>
                              </div>`;
  }
}
