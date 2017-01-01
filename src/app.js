// App!    https://api.guildwars2.com/v2/achievements/daily/tomorrow

// https://api.guildwars2.com/v2/achievements?ids=

var todayPVE = [];
var todayPVP = [];
var todayWVW = [];
var todaySpec = [];
var todayRewards = [];
var tomorrowPVE = [];
var tomorrowPVP = [];
var tomorrowWVW = [];
var tomorrowSpec = [];
var tomorrowRewards = [];

(function getTodaysData() {
	$.ajax({
		method: "GET",
		url: "https://api.guildwars2.com/v2/achievements/daily",
		dataType: "json"
	}).then(function (data){
		console.log(data);
		for (let i = 0; i < data.pve.length; i++) {
			todayPVE.push(data.pve[i].id);
		}
		for (let i = 0; i < data.pvp.length; i++) {
			todayPVP.push(data.pvp[i].id);
		}
		for (let i = 0; i < data.wvw.length; i++) {
			todayWVW.push(data.wvw[i].id);
		}
		for (let i = 0; i < data.special.length; i++) {
			todaySpec.push(data.special[i].id);
		}

		getAchievements(postList("pve"), getTodaysAchievementsURL(todayPVE), "pve")
		getAchievements(postList("pvp"), getTodaysAchievementsURL(todayPVP), "pvp");
		getAchievements(postList("wvw"), getTodaysAchievementsURL(todayWVW), "wvw");
		if (todaySpec) {
			getAchievements(postList("special"), getTodaysAchievementsURL(todaySpec), "special");
		}	
	});
})();

function getAchievements(postList, url, cat) {
	return $.ajax({
		method: "GET",
		url: url,
		dataType: "json"
	}).then(function (data){
		console.log(data, cat);
		for (let i = 0; i < data.length; i++) {
			var html = "<br /><td class='col-md-3'>"+ data[i].name + ":</td>" +
				"<td class='col-md-8 col-md-offset-1'> " + data[i].requirement + "</td>";
			if (cat == "pve") {
				$("#pve").append(html);
			} else if (cat == "pvp") {
				$("#pvp").append(html);
			} else if (cat == "wvw") {
				$("#wvw").append(html);
			} else if (cat == "special") {
				$("#special").append(html);
			} else {
				return;
			}
		}
	});
}

function postList(cat) {
	if (cat == "pve") {
		$("#pve").append("<h3>PvE:</h3>");
	} else if (cat == "pvp") {
		$("#pvp").append("<h3>PvP:</h3>");
	} else if (cat == "wvw") {
		$("#wvw").append("<h3>WvW:</h3>");
	} else if (cat == "special") {
		$("#special").append("<h3>Special:</h3>");
	} else {
		return;
	}
}

function getTodaysAchievementsURL(array) {
	achieveUrl = "https://api.guildwars2.com/v2/achievements?ids="
	for (let i = 0; i < array.length; i++) {
		if (i == array.length - 1) {
			achieveUrl += array[i];
		} else {
			achieveUrl += array[i]+",";
		}
	}
	console.log(achieveUrl);
	return achieveUrl;
}