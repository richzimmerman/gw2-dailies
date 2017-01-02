// App!    https://api.guildwars2.com/v2/achievements/daily/tomorrow

// https://api.guildwars2.com/v2/achievements?ids=

// Gets today's daily achievement ID numbers, pushes them to their respective arrays,
// then gets the details and builds the html - on pageload.
(function getTodaysData() {
	$.ajax({
		method: "GET",
		url: "https://api.guildwars2.com/v2/achievements/daily",
		dataType: "json"
	}).then(function (data){
		let todayPVE = [];
		let todayPVP = [];
		let todayWVW = [];
		let todaySpec = [];
		for (let i = 0; i < data.pve.length; i++) {
			todayPVE.push(data.pve[i].id);
		}
		for (let i = 0; i < data.pvp.length; i++) {
			todayPVP.push(data.pvp[i].id);
		}
		for (let i = 0; i < data.wvw.length; i++) {
			todayWVW.push(data.wvw[i].id);
		}
		if (data.special) {
			for (let i = 0; i < data.special.length; i++) {
				todaySpec.push(data.special[i].id);
			}
		}
		getAchievements(postList("pve"), getTodaysAchievementsURL(todayPVE), "pve")
		getAchievements(postList("pvp"), getTodaysAchievementsURL(todayPVP), "pvp");
		getAchievements(postList("wvw"), getTodaysAchievementsURL(todayWVW), "wvw");
		if (todaySpec) {
			getAchievements(postList("special"), getTodaysAchievementsURL(todaySpec), "special");
		}	
	});
})();

// Gets the achievement details and builds the HTML
function getAchievements(postList, url, cat) {
	return $.ajax({
		method: "GET",
		url: url,
		dataType: "json"
	}).then(function (data){
		var todayRewards = [];
		for (let i = 0; i < data.length; i++) {
			todayRewards.push(data[i].rewards[0].id);
			let tr = document.createElement("tr");
			tr.className = "col-xs-12"
			tr.innerHTML += "<td class='col-xs-3'>"+data[i].name+":</td>";
			tr.innerHTML += "<td class='col-xs-8 col-xs-offset-1'>"+data[i].requirement+"</td>";
			if (cat == "pve") {
				$("#pve").append(tr);
			} else if (cat == "pvp") {
				$("#pvp").append(tr);
			} else if (cat == "wvw") {
				$("#wvw").append(tr);
			} else if (cat == "special") {
				$("#special").append(tr);
			} else {
				return;
			}
			
		}
		let img = document.createElement("img");
		// img.className = "fluid-image";
		img.src = data[0].icon;
		if (cat == "pvp") {
			$("#pvp").prepend(img);
		} else if (cat == "wvw") {
			$("#wvw").prepend(img);
		} else if (cat == "special") {
			$("#special").prepend(img);
		} else {
			return;
		}
	});
}

// Adds headline element for each category (This is necessary since the Special category
// is not a year-round achievement category)
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

// Builds the URL with achievement IDs for next GET request
function getTodaysAchievementsURL(array) {
	achieveUrl = "https://api.guildwars2.com/v2/achievements?ids="
	for (let i = 0; i < array.length; i++) {
		if (i == array.length - 1) {
			achieveUrl += array[i];
		} else {
			achieveUrl += array[i]+",";
		}
	}
	return achieveUrl;
}
/******* Tomorrow *****************************************************/
(function getTomorrowsAchievements(){
	$.ajax({
		method: "GET",
		url: "https://api.guildwars2.com/v2/achievements/daily/tomorrow",
		dataType: "json"
	}).then(function (data){
		var tomorrowPVE = [];
		var tomorrowPVP = [];
		var tomorrowWVW = [];
		var tomorrowSpec = [];
		for (let i = 0; i < data.pve.length; i++) {
			tomorrowPVE.push(data.pve[i].id);
		}
		for (let i = 0; i < data.pvp.length; i++) {
			tomorrowPVP.push(data.pvp[i].id);
		}
		for (let i = 0; i < data.wvw.length; i++) {
			tomorrowWVW.push(data.wvw[i].id);
		}
		if (data.special) {
			for (let i = 0; i < data.special.length; i++) {
				tomorrowSpec.push(data.special[i].id);
			}
		}
		getTomAchievements(tomPostList("pve"), getTodaysAchievementsURL(tomorrowPVE), "pve")
		getTomAchievements(tomPostList("pvp"), getTodaysAchievementsURL(tomorrowPVP), "pvp");
		getTomAchievements(tomPostList("wvw"), getTodaysAchievementsURL(tomorrowWVW), "wvw");
		if (tomorrowSpec) {
			getTomAchievements(tomPostList("special"), getTodaysAchievementsURL(tomorrowSpec), "special");
		}	
	});
})();

// Gets the achievement details and builds the HTML
function getTomAchievements(postList, url, cat) {
	return $.ajax({
		method: "GET",
		url: url,
		dataType: "json"
	}).then(function (data){
		var tomorrowRewards = [];
		for (let i = 0; i < data.length; i++) {
			tomorrowRewards.push(data[i].rewards[0].id);
			let tr = document.createElement("tr");
			tr.className = "col-xs-12"
			tr.innerHTML += "<td class='col-xs-3'>"+data[i].name+":</td>";
			tr.innerHTML += "<td class='col-xs-8 col-xs-offset-1'>"+data[i].requirement+"</td>";
			if (cat == "pve") {
				$("#tom-pve").append(tr);
			} else if (cat == "pvp") {
				$("#tom-pvp").append(tr);
			} else if (cat == "wvw") {
				$("#tom-wvw").append(tr);
			} else if (cat == "special") {
				$("#tom-special").append(tr);
			} else {
				return;
			}
			
		}
		let img = document.createElement("img");
		// img.className = "fluid-image";
		img.src = data[0].icon;
		if (cat == "pvp") {
			$("#tom-pvp").prepend(img);
		} else if (cat == "wvw") {
			$("#tom-wvw").prepend(img);
		} else if (cat == "special") {
			$("#tom-special").prepend(img);
		} else {
			return;
		}
	});
}

function tomPostList(cat) {
	if (cat == "pve") {
		$("#tom-pve").append("<h3>PvE:</h3>");
	} else if (cat == "pvp") {
		$("#tom-pvp").append("<h3>PvP:</h3>");
	} else if (cat == "wvw") {
		$("#tom-wvw").append("<h3>WvW:</h3>");
	} else if (cat == "special") {
		$("#tom-special").append("<h3>Special:</h3>");
	} else {
		return;
	}
}




//  Figure these rewards functions out later. (multiple global arrays?)
function getRewardsURL(array) {
	rewardUrl = "https://api.guildwars2.com/v2/items?ids=";
	for (let i = 0; i < array.length; i++) {
		if (i == array.length - 1) {
			rewardUrl += array[i];
		} else {
			rewardUrl += array[i]+",";
		}
	}
	console.log(rewardUrl);
	return rewardUrl;
}

function getRewards(url) {
	return $.ajax({
		method: "GET",
		url: url,
		dataType: "json"
	}).then(function(data){
		console.log(data);
	});
}

$("#today-button").on("click", function(){
	$("#navbar2").hide(0, function (){
		$("#navbar1").show(0);
	});
	$("#tomorrow").fadeOut(500, function(){
		$("#today").fadeIn(500);
	});
});

$("#tomorrow-button").on("click", function(){
	$("#navbar1").hide(0, function (){
		$("#navbar2").show(0);
	});
	$("#today").fadeOut(500, function(){
		$("#tomorrow").fadeIn(500);
	});
});


// Navbar scroll animation
$('a').click(function(){
	if ($(window).width() >= 975) {
	    $('html, body').animate({
	        scrollTop: $('[name="' + $.attr(this, 'href').substr(1) + '"]').offset().top - 70
	    }, 500);
	    $(this).blur();
	    return false;
	}
	if ($(window).width() < 975) {
		$('html, body').animate({
	        scrollTop: $('[name="' + $.attr(this, 'href').substr(1) + '"]').offset().top - 260
	    }, 500);
	    $(this).blur();
	    return false;
	}
});
