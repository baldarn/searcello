const SEARCHES = 'searches';

let searches = JSON.parse(localStorage.getItem(SEARCHES));

if(searches == null){
	searches = [];
}

let vm = {
	data : searches,

	search : function(){
		// delete field
		let script = "$('.header-search-input').val('')";
		chrome.tabs.executeScript({
	  	  code: script
	  });

		// search
		let src =	searches[this.getAttribute('data-id')];
		script = '$(".header-search-input").sendkeys(' + JSON.stringify(src) +')';
		chrome.tabs.executeScript({
	  	  code: script
	  });
	},

	edit : function(){
		let idx = this.getAttribute('data-id');
		console.log(vm.data);
		let temp = prompt("modify " + idx, vm.data[idx]) || vm.data[idx];
		vm.data[idx] = temp;

		// trik to update rivetsjs
		vm.data.push("");
		vm.data.pop();
		localStorage.setItem(SEARCHES, JSON.stringify(vm.data));
	},

	del : function(){
		vm.data.splice(this.getAttribute('data-id'), 1);
		localStorage.setItem(SEARCHES, JSON.stringify(vm.data));
	}
};

function addItem(search){
	vm.data.push(search);
	localStorage.setItem(SEARCHES, JSON.stringify(vm.data));
};

rivets.bind(document.getElementById('scope') , {vm : vm});

document.getElementById('search').addEventListener('keydown' ,
	function(e){
		if (e.keyCode === 13) { // enter
				addItem(this.value);
        this.value = '';
    }
	});

	chrome.tabs.executeScript({
			code: "inited"
	}, function(res){
		console.log(res);
		if(!res[0]){
			chrome.tabs.executeScript({
					code: "var inited = true;"
			});
			chrome.tabs.executeScript(null, { file: "jquery-3.1.1.min.js" }, function() {
				chrome.tabs.executeScript(null, { file: "bililiteRange.js" } , function() {
					chrome.tabs.executeScript(null, { file: "jquery.sendkeys.js" }, function(){
					});
				});
			});
		}


	});
