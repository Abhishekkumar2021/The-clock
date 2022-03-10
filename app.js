const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
let isFirstTime = true;
function doSomething() {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	const h = canvas.height;
	const w = canvas.width;
	ctx.fillStyle = "rgb(40,45,48)";
	ctx.strokeStyle = "white";
	ctx.shadowOffsetX = 10;
	ctx.shadowOffsetY = 10;
	ctx.shadowBlur = 10;
	ctx.shadowColor = "rgb(0,0,0,0.2)";
	ctx.lineCap = "round";
	let date = new Date();
	let hours = date.getHours();
	let minutes = date.getMinutes();
	let seconds = date.getSeconds();
	let secondsAngle = 2 * Math.PI * (seconds / 60);
	let minutesAngle = 2 * Math.PI * ((minutes + seconds / 60) / 60);
	let hoursAngle = 2 * Math.PI * ((hours + minutes / 60 + seconds / 3600) / 12);
	console.log(hours, minutes);
	let milliseconds = 0;
	function animation() {
		const r = Math.min(h / 2 - 50, w / 2 - 50);
		ctx.clearRect(0, 0, w, h);
		ctx.save();
		ctx.translate(w / 2, h / 2);
		ctx.beginPath();
		ctx.arc(0, 0, r, 0, 2 * Math.PI);
		ctx.fill();
		ctx.closePath();

		ctx.font = `${r / 15}px Roboto Mono`;
		ctx.fillStyle = "pink";
		for (let i = 0; i < 12; i++) {
			let w = r / 50;
			if (i % 3 == 0) w = r / 30;
			ctx.beginPath();
			ctx.arc(
				(r / 1.1) * Math.sin((2 * Math.PI * i) / 12),
				(r / 1.1) * Math.cos((2 * Math.PI * i) / 12),
				w,
				0,
				2 * Math.PI
			);
			ctx.fill();
			ctx.closePath();
		}
		ctx.fillText(
			`${hours}:${minutes}:${seconds}:${milliseconds}`,
			-r / 6,
			r / 1.8
		);
		ctx.beginPath();

		ctx.rotate(secondsAngle);
		ctx.moveTo(0, 0);
		ctx.lineTo(0, -r / 1.4);
		ctx.lineWidth = r / 50;
		ctx.strokeStyle = "teal";
		ctx.stroke();
		ctx.closePath();
		milliseconds += 1;
		if (milliseconds == 59) {
			seconds += 1;
			milliseconds = 0;
		}
		if (seconds == 59) {
			minutes += 1;
			seconds = 0;
		}
		if (minutes == 59) {
			hours += 1;
			minutes = 0;
		}
		secondsAngle += (Math.PI * 2) / 3600;
		ctx.restore();

		ctx.save();
		ctx.translate(w / 2, h / 2);

		ctx.beginPath();

		ctx.rotate(minutesAngle);
		ctx.moveTo(0, 0);
		ctx.lineTo(0, -r / 1.6);
		ctx.lineWidth = r / 40;
		ctx.strokeStyle = "orange";
		ctx.stroke();
		ctx.closePath();
		minutesAngle += (Math.PI * 2) / (3600 * 60);

		ctx.restore();
		ctx.save();
		ctx.translate(w / 2, h / 2);

		ctx.beginPath();

		ctx.rotate(hoursAngle);
		ctx.moveTo(0, 0);
		ctx.lineTo(0, -r / 1.8);
		ctx.lineWidth = r / 25;
		ctx.strokeStyle = "pink";
		ctx.stroke();
		ctx.closePath();
		hoursAngle += (Math.PI * 2) / (3600 * 60 * 60);
		ctx.arc(0, 0, 25, 0, 2 * Math.PI);
		ctx.fillStyle = "pink";
		ctx.fill();
		ctx.restore();
		requestAnimationFrame(animation);
	}
	requestAnimationFrame(animation);
}

window.addEventListener("resize", function () {
	isFirstTime = false;
	doSomething();
});
window.addEventListener("load", () => {
	if (isFirstTime) doSomething();
});
