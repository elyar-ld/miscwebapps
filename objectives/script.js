var olist = [
	{
		"name" : "Excercise ",
		"description" : "Excercise on daily basis",
		"donewhen" : "Run for 3 weeks in a row",
		"deadline" : "31-03-2019",
		"babysteps" : [
			"Buy running shoes",
			"Get running partner",
		],
		"links" : [
			{
				"title" : "Ran kilometers table",
				"link" : "https://docs.google.com/spreadsheets/d/1AjQDZteshPKeNkr-e_JBJkggzq_pG890/edit?usp=sharing"
			}
		]
	},
]

var card = '<div class="card">\
				<div class="card-header" id="oh{0}">\
					<h2 class="mb-0">\
						<button class="btn btn-link" type="button" data-toggle="collapse" data-target="#o{0}" aria-expanded="true" aria-controls="o{0}">\
							{1}\
						</button>\
					</h2>\
					<div class="done-btn" id="obtn{0}" onclick="odone(this);">&#8730;</div>\
				</div>\
				<div id="o{0}" class="collapse" aria-labelledby="oh{0}" data-parent="#objectivesAccordion">\
					<div class="card-body">\
						<p>\
							<h5>Description</h5>\
							{2}\
						</p>\
						<p>\
							<h5>Completion criteria</h5>\
							{3}\
						</p>\
						<p>\
							<h5>Deadline</h5>\
							{4}\
						</p>\
						<p>\
							<h5>Babysteps</h5>\
							{5}\
						</p>\
						<p>\
							<h5>Links</h5>\
							{6}\
						</p>\
					</div>\
				</div>\
			</div>';

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.split(search).join(replacement);
};

String.prototype.format = function() {
  a = this;
  for (k in arguments) {
    a = a.replaceAll("{" + k + "}", arguments[k])
  }
  return a
}

function odone(el){
	el.classList.toggle("done");
	localStorage.setItem(el.id, localStorage.getItem(el.id)*-1);
}

function mark(el){
	el.classList.toggle("marked");
	localStorage.setItem(el.id, localStorage.getItem(el.id)*-1);
}

function fill(){
	var accordion = document.getElementById("objectivesAccordion");
	var babydone = [];
	for(let i=0; i< olist.length; i+=1){
		var list ="";
		for(let j=0; j< olist[i].babysteps.length; j+=1){
			var id = "o{0}bs{1}".format(""+i,""+j);
			list += "<li id='{0}' onclick='mark(this)'>{1}</li>".format(id, olist[i].babysteps[j]);
			if(localStorage.getItem(id) === "1") babydone.push(id);
			else localStorage.setItem(id, -1);
		}
		var links ="";
		for(let j=0; j< olist[i].links.length; j+=1){
			links += "<a href='{0}' target='_blank'><li>{1}</li></a>".format(olist[i].links[j].link, olist[i].links[j].title);
		}
		accordion.innerHTML += card.format(""+i, olist[i].name, olist[i].description, olist[i].donewhen, olist[i].deadline, list, links);
		if(localStorage.getItem("obtn"+i) === "1") document.getElementById("obtn"+i).classList.toggle("done");
		else localStorage.setItem("obtn"+i, -1);
	}
	for(let i=0; i< babydone.length; i+=1){
		document.getElementById(babydone[i]).classList.toggle("marked");
	}
}

var objectivesList = localStorage.getItem("objectivesList");
if(localStorage.getItem("objectivesList") !== null) olist = JSON.parse(objectivesList);
fill();