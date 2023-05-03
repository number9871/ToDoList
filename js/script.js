document.addEventListener('DOMContentLoaded', () => {
	const tasksDB = {
		tasks: [],
		create(input) {
			const id = this.tasks.length,
				  indexOf = input.value.indexOf('\n'),
				  header = input.value.substring(0, indexOf),
				  text = input.value.slice(indexOf + 1).replace(/\n/g, '</br>'),
				  done = false;

			this.tasks.push({id, indexOf, header, text, done}); 
		},
		idGenerator() {
			if(this.tasks) {
				for (let i = 0; i < this.tasks.length; i++) {
					this.tasks[i].id = i;
				}
			}
		},
		log() {
			console.log(this);
		}
	};
	
	const taskContainer = document.querySelector('#taskContainer'),
		  taskSubmitButton = document.querySelector('#taskSubmitButton'),
		  taskInput = document.querySelector('#taskInput');

	const setLocalStorage = () => {
			localStorage.setItem('tasks', JSON.stringify(tasksDB.tasks));
	};

	const getLocalStorage = () => {
		if (localStorage.getItem('tasks')) {
			tasksDB.tasks = JSON.parse(localStorage.getItem('tasks'));
		}
	};

	taskSubmitButton.onclick = function() {
		taskValidation(taskInput, taskSubmitButton);
	};
	
	function taskValidation(input, putAfter, modal) {
		const taskValidationError = document.querySelector('#taskValidationError');
		
		
		if (input.value && input.value.length > 4) {
			if (taskValidationError) {
				taskValidationError.remove();
				input.ariaInvalid = '';
			}
			
			if (modal) {
				modal[0].open = false;
				if (taskValidationError) {
					taskValidationError.remove();
					input.ariaInvalid = '';
				}
				modal[1].splice(modal[2], 1);
			}

			tasksDB.create(input);
			taskCreating(input);

		} else {
			if (!taskValidationError) {
				putAfter.insertAdjacentHTML('afterend', 
				'<small class="redText" id="taskValidationError">Введите текст не короче 5 символов!</small>');
				input.ariaInvalid = 'true';
			}
		}
	}

	function taskCreating(input) {
		taskContainer.innerHTML = '';

		tasksDB.idGenerator();

		if (tasksDB.tasks.length > 0) {
			tasksDB.tasks.forEach(item => {
				if (item.done) {
					if(!item.header) {
						taskContainer.insertAdjacentHTML('beforeend', `
							<article class='article done-task' id='${item.id}'>
									<div class="interaction-wrapper">
										<div class="edit hover-visible" id="taskEdit">
											<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
												<path d="M441 58.9L453.1 71c9.4 9.4 9.4 24.6 0 33.9L424 134.1 377.9 88 407 58.9c9.4-9.4 24.6-9.4 33.9 0zM209.8 256.2L344 121.9 390.1 168 255.8 302.2c-2.9 2.9-6.5 5-10.4 6.1l-58.5 16.7 16.7-58.5c1.1-3.9 3.2-7.5 6.1-10.4zM373.1 25L175.8 222.2c-8.7 8.7-15 19.4-18.3 31.1l-28.6 100c-2.4 8.4-.1 17.4 6.1 23.6s15.2 8.5 23.6 6.1l100-28.6c11.8-3.4 22.5-9.7 31.1-18.3L487 138.9c28.1-28.1 28.1-73.7 0-101.8L474.9 25C446.8-3.1 401.2-3.1 373.1 25zM88 64C39.4 64 0 103.4 0 152V424c0 48.6 39.4 88 88 88H360c48.6 0 88-39.4 88-88V312c0-13.3-10.7-24-24-24s-24 10.7-24 24V424c0 22.1-17.9 40-40 40H88c-22.1 0-40-17.9-40-40V152c0-22.1 17.9-40 40-40H200c13.3 0 24-10.7 24-24s-10.7-24-24-24H88z"/>
											</svg>
										</div>
										<div class="delete hover-visible" id="taskRemove">
											<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
												<path d="M170.5 51.6L151.5 80h145l-19-28.4c-1.5-2.2-4-3.6-6.7-3.6H177.1c-2.7 0-5.2 1.3-6.7 3.6zm147-26.6L354.2 80H368h48 8c13.3 0 24 10.7 24 24s-10.7 24-24 24h-8V432c0 44.2-35.8 80-80 80H112c-44.2 0-80-35.8-80-80V128H24c-13.3 0-24-10.7-24-24S10.7 80 24 80h8H80 93.8l36.7-55.1C140.9 9.4 158.4 0 177.1 0h93.7c18.7 0 36.2 9.4 46.6 24.9zM80 128V432c0 17.7 14.3 32 32 32H336c17.7 0 32-14.3 32-32V128H80zm80 64V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16z"/>
											</svg>
										</div>
									</div>
									<div class="done-btn hover-visible" id="taskDone">
										<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
											<path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-111 111-47-47c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l64 64c9.4 9.4 24.6 9.4 33.9 0L369 209z"/>
										</svg>
									</div>
									<h4>${item.text}</h4>
							</article>
						`);
					} else {
						taskContainer.insertAdjacentHTML('beforeend', `
							<article class='article done-task' id='${item.id}'>
								<div class="interaction-wrapper">
									<div class="edit hover-visible" id="taskEdit">
										<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
											<path d="M441 58.9L453.1 71c9.4 9.4 9.4 24.6 0 33.9L424 134.1 377.9 88 407 58.9c9.4-9.4 24.6-9.4 33.9 0zM209.8 256.2L344 121.9 390.1 168 255.8 302.2c-2.9 2.9-6.5 5-10.4 6.1l-58.5 16.7 16.7-58.5c1.1-3.9 3.2-7.5 6.1-10.4zM373.1 25L175.8 222.2c-8.7 8.7-15 19.4-18.3 31.1l-28.6 100c-2.4 8.4-.1 17.4 6.1 23.6s15.2 8.5 23.6 6.1l100-28.6c11.8-3.4 22.5-9.7 31.1-18.3L487 138.9c28.1-28.1 28.1-73.7 0-101.8L474.9 25C446.8-3.1 401.2-3.1 373.1 25zM88 64C39.4 64 0 103.4 0 152V424c0 48.6 39.4 88 88 88H360c48.6 0 88-39.4 88-88V312c0-13.3-10.7-24-24-24s-24 10.7-24 24V424c0 22.1-17.9 40-40 40H88c-22.1 0-40-17.9-40-40V152c0-22.1 17.9-40 40-40H200c13.3 0 24-10.7 24-24s-10.7-24-24-24H88z"/>
										</svg>
									</div>
									<div class="delete hover-visible" id="taskRemove">
										<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
											<path d="M170.5 51.6L151.5 80h145l-19-28.4c-1.5-2.2-4-3.6-6.7-3.6H177.1c-2.7 0-5.2 1.3-6.7 3.6zm147-26.6L354.2 80H368h48 8c13.3 0 24 10.7 24 24s-10.7 24-24 24h-8V432c0 44.2-35.8 80-80 80H112c-44.2 0-80-35.8-80-80V128H24c-13.3 0-24-10.7-24-24S10.7 80 24 80h8H80 93.8l36.7-55.1C140.9 9.4 158.4 0 177.1 0h93.7c18.7 0 36.2 9.4 46.6 24.9zM80 128V432c0 17.7 14.3 32 32 32H336c17.7 0 32-14.3 32-32V128H80zm80 64V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16z"/>
										</svg>
									</div>
								</div>
								<div class="done-btn hover-visible" id="taskDone">
									<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
										<path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-111 111-47-47c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l64 64c9.4 9.4 24.6 9.4 33.9 0L369 209z"/>
									</svg>
								</div>
								<h4>${item.header}</h4>
								<p>${item.text}</p>
							</article>
						`);
					}
				} else if (!item.done) {
					if(!item.header) {
						taskContainer.insertAdjacentHTML('afterbegin', `
							<article class='article' id='${item.id}'>
									<div class="interaction-wrapper">
										<div class="edit hover-visible" id="taskEdit">
											<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
												<path d="M441 58.9L453.1 71c9.4 9.4 9.4 24.6 0 33.9L424 134.1 377.9 88 407 58.9c9.4-9.4 24.6-9.4 33.9 0zM209.8 256.2L344 121.9 390.1 168 255.8 302.2c-2.9 2.9-6.5 5-10.4 6.1l-58.5 16.7 16.7-58.5c1.1-3.9 3.2-7.5 6.1-10.4zM373.1 25L175.8 222.2c-8.7 8.7-15 19.4-18.3 31.1l-28.6 100c-2.4 8.4-.1 17.4 6.1 23.6s15.2 8.5 23.6 6.1l100-28.6c11.8-3.4 22.5-9.7 31.1-18.3L487 138.9c28.1-28.1 28.1-73.7 0-101.8L474.9 25C446.8-3.1 401.2-3.1 373.1 25zM88 64C39.4 64 0 103.4 0 152V424c0 48.6 39.4 88 88 88H360c48.6 0 88-39.4 88-88V312c0-13.3-10.7-24-24-24s-24 10.7-24 24V424c0 22.1-17.9 40-40 40H88c-22.1 0-40-17.9-40-40V152c0-22.1 17.9-40 40-40H200c13.3 0 24-10.7 24-24s-10.7-24-24-24H88z"/>
											</svg>
										</div>
										<div class="delete hover-visible" id="taskRemove">
											<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
												<path d="M170.5 51.6L151.5 80h145l-19-28.4c-1.5-2.2-4-3.6-6.7-3.6H177.1c-2.7 0-5.2 1.3-6.7 3.6zm147-26.6L354.2 80H368h48 8c13.3 0 24 10.7 24 24s-10.7 24-24 24h-8V432c0 44.2-35.8 80-80 80H112c-44.2 0-80-35.8-80-80V128H24c-13.3 0-24-10.7-24-24S10.7 80 24 80h8H80 93.8l36.7-55.1C140.9 9.4 158.4 0 177.1 0h93.7c18.7 0 36.2 9.4 46.6 24.9zM80 128V432c0 17.7 14.3 32 32 32H336c17.7 0 32-14.3 32-32V128H80zm80 64V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16z"/>
											</svg>
										</div>
									</div>
									<div class="done-btn hover-visible" id="taskDone">
										<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
											<path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-111 111-47-47c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l64 64c9.4 9.4 24.6 9.4 33.9 0L369 209z"/>
										</svg>
									</div>
									<h4>${item.text}</h4>
							</article>
						`);
					} else {
						taskContainer.insertAdjacentHTML('afterbegin', `
							<article class='article' id='${item.id}'>
								<div class="interaction-wrapper">
									<div class="edit hover-visible" id="taskEdit">
										<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
											<path d="M441 58.9L453.1 71c9.4 9.4 9.4 24.6 0 33.9L424 134.1 377.9 88 407 58.9c9.4-9.4 24.6-9.4 33.9 0zM209.8 256.2L344 121.9 390.1 168 255.8 302.2c-2.9 2.9-6.5 5-10.4 6.1l-58.5 16.7 16.7-58.5c1.1-3.9 3.2-7.5 6.1-10.4zM373.1 25L175.8 222.2c-8.7 8.7-15 19.4-18.3 31.1l-28.6 100c-2.4 8.4-.1 17.4 6.1 23.6s15.2 8.5 23.6 6.1l100-28.6c11.8-3.4 22.5-9.7 31.1-18.3L487 138.9c28.1-28.1 28.1-73.7 0-101.8L474.9 25C446.8-3.1 401.2-3.1 373.1 25zM88 64C39.4 64 0 103.4 0 152V424c0 48.6 39.4 88 88 88H360c48.6 0 88-39.4 88-88V312c0-13.3-10.7-24-24-24s-24 10.7-24 24V424c0 22.1-17.9 40-40 40H88c-22.1 0-40-17.9-40-40V152c0-22.1 17.9-40 40-40H200c13.3 0 24-10.7 24-24s-10.7-24-24-24H88z"/>
										</svg>
									</div>
									<div class="delete hover-visible" id="taskRemove">
										<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
											<path d="M170.5 51.6L151.5 80h145l-19-28.4c-1.5-2.2-4-3.6-6.7-3.6H177.1c-2.7 0-5.2 1.3-6.7 3.6zm147-26.6L354.2 80H368h48 8c13.3 0 24 10.7 24 24s-10.7 24-24 24h-8V432c0 44.2-35.8 80-80 80H112c-44.2 0-80-35.8-80-80V128H24c-13.3 0-24-10.7-24-24S10.7 80 24 80h8H80 93.8l36.7-55.1C140.9 9.4 158.4 0 177.1 0h93.7c18.7 0 36.2 9.4 46.6 24.9zM80 128V432c0 17.7 14.3 32 32 32H336c17.7 0 32-14.3 32-32V128H80zm80 64V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16z"/>
										</svg>
									</div>
								</div>
								<div class="done-btn hover-visible" id="taskDone">
									<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
										<path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-111 111-47-47c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l64 64c9.4 9.4 24.6 9.4 33.9 0L369 209z"/>
									</svg>
								</div>
								<h4>${item.header}</h4>
								<p>${item.text}</p>
							</article>
						`);
					}
				}
			});

			taskDelete();
			taskDone();
			taskEdit();
		}
		
		if (input) {
			input.value = '';
		}

		setLocalStorage();
	}
	
	function taskDelete() {
		document.querySelectorAll('.delete').forEach(btn => {
			btn.onclick = function() {
				tasksDB.tasks.forEach((item, i ,arr) => {
					if (btn.parentElement.parentElement.id == item.id) {
						arr.splice(i, 1);
						
						taskCreating();
					}
				});
			};
		});
	}

	function taskDone() {
		document.querySelectorAll('.done-btn').forEach(btn => {
			btn.onclick = function() {
				if (btn.parentElement.classList.contains('done-task')) {
					btn.parentElement.classList.remove('done-task');
					
					tasksDB.tasks.forEach((item, i, arr) => {
						if (btn.parentElement.id == item.id) {
							arr[i].done = false;

							arr.splice(i, 1);
							arr.push(item);

							taskCreating();
						}
					});
				} else {
					btn.parentElement.classList.add('done-task');
					
					tasksDB.tasks.forEach((item, i, arr) => {
						if (btn.parentElement.id == item.id) {
							arr[i].done = true;

							arr.splice(i, 1);
							arr.unshift(item);

							taskCreating();
						}
					});
				}
			};
		});
	}

	function taskEdit() {
		document.querySelectorAll('.edit').forEach(btn => {
			btn.onclick = function() {
				const modalInput = document.querySelector('.modal'),
					  modalWindow = document.querySelector('dialog'),
					  modalCancel = document.querySelector('#modalCancel'),
					  modalConfirm = document.querySelector('#modalConfirm');
				let text;

				tasksDB.tasks.forEach((item, i, arr) => {
					if (btn.parentElement.parentElement.id == item.id) {
						if (item.header) {
							text = `${item.header + '\n' + item.text.replace(/<\/br>/g, '\n')}`;
						} else {
							text = item.text.replace(/<\/br>/g, '\n');
						}

						modalWindow.open = true;
						modalInput.value = text;

						modalConfirm.onclick = function() {
							taskValidation(modalInput, modalInput, [modalWindow, arr, i]);
						};
					}
				});

				modalCancel.onclick = function() {
					modalInput.value = '';
					modalWindow.open = false;
				};
			};
		});
	}

	if (localStorage.length != 0) {
		getLocalStorage();
	}
	taskCreating();
});