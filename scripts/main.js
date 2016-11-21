window.onload = function() {
	var quickAddBtn = document.querySelector("#quickAdd");
	var addBtn = document.querySelector("#add");
	var cancelBtn = document.querySelector("#cancel");
	var quickAddForm = document.querySelector(".quickaddForm");

	var fullname = document.querySelector("#fullname");
	var phone = document.querySelector("#phone");
	var address = document.querySelector("#address");
	var city = document.querySelector("#city");
	var email = document.querySelector("#email");

	var addBookDiv = document.querySelector(".addbook");

	var addressBook = [];

	quickAddBtn.addEventListener("click", function(){
		quickAddForm.style.display = "block";
	});

	cancelBtn.addEventListener("click", hideValidate);
	cancelBtn.addEventListener("click", function(){
		quickAddForm.style.display = "none";
	});
	

	addBtn.addEventListener("click", addToBook);
	addBtn.addEventListener("click", validate);

	addBookDiv.addEventListener("click", removeEntry);


	function jsonStructure(fullname, phone, address, city, email) {
		this.fullname = fullname;
		this.phone = phone;
		this.address = address;
		this.city = city;
		this.email = email;
	}

	function addToBook() {
		var isNull = fullname.value!="" && phone.value!="" && address.value!="" && city.value!="" && email.value!="";
		if(isNull) {
			
			var obj = new jsonStructure(fullname.value, phone.value, address.value, city.value, email.value);
			addressBook.push(obj);
			localStorage["addbook"] = JSON.stringify(addressBook);

			
			quickAddForm.style.display = "none";

			
			clearForm();

			
			showAddressBook();
		}
	}


	function removeEntry(e) {
		if(e.target.classList.contains("delBtn")) {
			var remID = e.target.getAttribute("data-id");

			addressBook.splice(remID, 1);
			localStorage["addbook"] = JSON.stringify(addressBook);
			showAddressBook();
		}
	}

	function clearForm() {
		var form = document.querySelectorAll(".formFields");
		for(var i in form) {
			form[i].value = "";
		}
	}

	function showAddressBook() {
	
		if(localStorage["addbook"] === undefined) {
			localStorage["addbook"] = "[]";
		} else {
			addressBook = JSON.parse(localStorage["addbook"]);
			addBookDiv.innerHTML = "";
			for(var n in addressBook) {
				var string = '<div class="entry">';
					string += '<div class="name"><p>' + addressBook[n].fullname + '</p></div>';
					string += '<div class="phone"><p>' + addressBook[n].phone +'</p></div>';
					string += '<div class="address"><p>' + addressBook[n].address + '</p></div>';
					string += '<div class="city"><p>'+ addressBook[n].city +'</p></div>';
					string += '<div class="email"><p>' + addressBook[n].email + '</p></div>';
					string += '<div class="del"><a href="#" class="delBtn" data-id="' + n + '">Delete</a></div>';
					string += '</div>';
					addBookDiv.innerHTML += string;
			}
		}

	}

	showAddressBook();

	

	function validate() {
		
		quickAddForm.addEventListener("submit", function(e) {
			e.preventDefault();

			var spans = document.getElementsByTagName("span");

			var fullname = document.dataForm.fullname;
			var phone = document.dataForm.phone;
			var address = document.dataForm.address;
			var city = document.dataForm.city;
			var email = document.dataForm.email;
			if(fullname.value === "") {
				spans[0].setAttribute("style", "visibility: visible")
			} else {
				spans[0].setAttribute("style", "visibility: hidden");
			}
			if(phone.value === "") {
				spans[1].setAttribute("style", "visibility: visible")
			} else {
				spans[1].setAttribute("style", "visibility: hidden");
			} 
			if(address.value === "") {
				spans[2].setAttribute("style", "visibility: visible")
			} else {
				spans[2].setAttribute("style", "visibility: hidden");
			}
			if(city.value === "") {
				spans[3].setAttribute("style", "visibility: visible")
			} else {
				spans[3].setAttribute("style", "visibility: hidden");
			}
			if(email.value === "") {
				spans[4].setAttribute("style", "visibility: visible")
			} else {
				spans[4].setAttribute("style", "visibility: hidden");
			}
		});

		if(fullname.value !== "" && phone.value !== "" && address.value !== "" && city.value !== "" && email.value !== "") {
			quickAddForm.submit();
		}
	}

	function hideValidate() {
		var spans = document.getElementsByTagName("span");
		
		spans[0].setAttribute("style", "visibility: hidden");
		spans[1].setAttribute("style", "visibility: hidden");
		spans[2].setAttribute("style", "visibility: hidden");
		spans[3].setAttribute("style", "visibility: hidden");
		spans[4].setAttribute("style", "visibility: hidden");
	}

}





