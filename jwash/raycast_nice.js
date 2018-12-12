// title:  Raycast Nice
// author: jwash
// desc:   a raycasting engine that is slow, but nice (code-wise)

// script: js

const screen = {
	width: 240,
	height: 136
};

const worldMap = [
	[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
	[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
	[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
	[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
	[1, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 0, 0, 0, 0, 3, 0, 3, 0, 3, 0, 0, 0, 1],
	[1, 0, 0, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
	[1, 0, 0, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0, 0, 3, 0, 0, 0, 3, 0, 0, 0, 1],
	[1, 0, 0, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
	[1, 0, 0, 0, 0, 0, 2, 2, 0, 2, 2, 0, 0, 0, 0, 3, 0, 3, 0, 3, 0, 0, 0, 1],
	[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
	[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
	[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
	[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
	[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
	[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
	[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
	[1, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
	[1, 4, 0, 4, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
	[1, 4, 0, 0, 0, 0, 5, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
	[1, 4, 0, 4, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
	[1, 4, 0, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
	[1, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
	[1, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
	[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];

const player = {
	pos: {
		x: 22,
		y: 11
	},
	dir: {
		x: -1,
		y: 0
	},
	cam: {
		x: 0,
		y: 0.66
	},
	map: {
		x: 22,
		y: 11
	},
	moveSpeed: 5,
	rotationSpeed: 3
};

const timer = {
	current: 0,
	old: 0,
	lastFrame: 0
};

const ray = {
	dir: {
		x: 0,
		y: 0
	},
	dist: {
		x: 0,
		y: 0,
		dx: 0,
		dy: 0,
		perp: 0
	},
	step: {
		x: 1,
		y: 1
	},
	wall: {
		hit: false,
		side: 1
	}
};

const column = {
	top: 0,
	height: 0,
	bottom: 0,
	color: 0
};

function TIC() {
	cls();

	for (x = 0; x < screen.width; x++) {
		createRay(x);

		setPlayerMapPosition();
		calculateRayDistance();
		calculateRayStepSize();

		ray.wall.hit = false;
		while (ray.wall.hit == false) {
			findWall();
		}

		calculateWallDistance();
		calculateColumnHeight();
		drawColumn(x);
	}

	updateFpsCounter();
	movePlayer();
}

function createRay(x) {
	var cameraX = (2 * x) / screen.width - 1;
	ray.dir.x = player.dir.x + player.cam.x * cameraX;
	ray.dir.y = player.dir.y + player.cam.y * cameraX;
}

function setPlayerMapPosition() {
	player.map.x = Math.trunc(player.pos.x);
	player.map.y = Math.trunc(player.pos.y);
}

function calculateRayDistance() {
	ray.dist.dx = Math.abs(1 / ray.dir.x);
	ray.dist.dy = Math.abs(1 / ray.dir.y);
}

function calculateRayStepSize() {
	if (ray.dir.x < 0) {
		ray.step.x = -1;
		ray.dist.x = (player.pos.x - player.map.x) * ray.dist.dx;
	} else {
		ray.step.x = 1;
		ray.dist.x = (player.map.x + 1.0 - player.pos.x) * ray.dist.dx;
	}
	if (ray.dir.y < 0) {
		ray.step.y = -1;
		ray.dist.y = (player.pos.y - player.map.y) * ray.dist.dy;
	} else {
		ray.step.y = 1;
		ray.dist.y = (player.map.y + 1.0 - player.pos.y) * ray.dist.dy;
	}
}

function findWall() {
	if (ray.dist.x < ray.dist.y) {
		ray.dist.x += ray.dist.dx;
		player.map.x += ray.step.x;
		ray.wall.side = 0;
	} else {
		ray.dist.y += ray.dist.dy;
		player.map.y += ray.step.y;
		ray.wall.side = 1;
	}

	if (worldMap[player.map.x][player.map.y] > 0) ray.wall.hit = true;
}

function calculateWallDistance() {
	if (ray.wall.side == 0)
		ray.dist.perp =
			(player.map.x - player.pos.x + (1 - ray.step.x) / 2) / ray.dir.x;
	else
		ray.dist.perp =
			(player.map.y - player.pos.y + (1 - ray.step.y) / 2) / ray.dir.y;
}

function calculateColumnHeight() {
	column.height = screen.height / ray.dist.perp;

	column.top = -column.height / 2 + screen.height / 2;
	if (column.top < 0) column.top = 0;
	column.bottom = column.height / 2 + screen.height / 2;
	if (column.bottom >= screen.height) column.bottom = screen.height - 1;
}

function drawColumn(x) {
	column.color = worldMap[player.map.x][player.map.y];

	if (ray.wall.side == 1) {
		column.color = column.color + 5;
	}

	line(x, column.top, x, column.bottom, column.color);
}

function updateFpsCounter() {
	timer.old = timer.current;
	timer.current = time();
	timer.lastFrame = (timer.current - timer.old) / 1000.0;
	print(Math.trunc(1.0 / timer.lastFrame));
}

function movePlayer() {
	var moveSpeedDelta = timer.lastFrame * player.moveSpeed;
	var rotationSpeedDelta = timer.lastFrame * player.rotationSpeed;

	if (btn(0)) {
		if (
			worldMap[Math.trunc(player.pos.x + player.dir.x * moveSpeedDelta)][
				Math.trunc(player.pos.y)
			] == 0
		)
			player.pos.x += player.dir.x * moveSpeedDelta;
		if (
			worldMap[Math.trunc(player.pos.x)][
				Math.trunc(player.pos.y + player.dir.y * moveSpeedDelta)
			] == 0
		)
			player.pos.y += player.dir.y * moveSpeedDelta;
	}

	if (btn(1)) {
		if (
			worldMap[Math.trunc(player.pos.x - player.dir.x * moveSpeedDelta)][
				Math.trunc(player.pos.y)
			] == 0
		)
			player.pos.x -= player.dir.x * moveSpeedDelta;
		if (
			worldMap[Math.trunc(player.pos.x)][
				Math.trunc(player.pos.y - player.dir.y * moveSpeedDelta)
			] == 0
		)
			player.pos.y -= player.dir.y * moveSpeedDelta;
	}

	if (btn(2)) {
		var oldDirX = player.dir.x;
		player.dir.x =
			player.dir.x * Math.cos(rotationSpeedDelta) -
			player.dir.y * Math.sin(rotationSpeedDelta);
		player.dir.y =
			oldDirX * Math.sin(rotationSpeedDelta) +
			player.dir.y * Math.cos(rotationSpeedDelta);
		var oldPlaneX = player.cam.x;
		player.cam.x =
			player.cam.x * Math.cos(rotationSpeedDelta) -
			player.cam.y * Math.sin(rotationSpeedDelta);
		player.cam.y =
			oldPlaneX * Math.sin(rotationSpeedDelta) +
			player.cam.y * Math.cos(rotationSpeedDelta);
	}

	if (btn(3)) {
		var oldDirX = player.dir.x;
		player.dir.x =
			player.dir.x * Math.cos(-rotationSpeedDelta) -
			player.dir.y * Math.sin(-rotationSpeedDelta);
		player.dir.y =
			oldDirX * Math.sin(-rotationSpeedDelta) +
			player.dir.y * Math.cos(-rotationSpeedDelta);
		var oldPlaneX = player.cam.x;
		player.cam.x =
			player.cam.x * Math.cos(-rotationSpeedDelta) -
			player.cam.y * Math.sin(-rotationSpeedDelta);
		player.cam.y =
			oldPlaneX * Math.sin(-rotationSpeedDelta) +
			player.cam.y * Math.cos(-rotationSpeedDelta);
	}
}

// <TILES>
// 001:efffffffff222222f8888888f8222222f8fffffff8ff0ffff8ff0ffff8ff0fff
// 002:fffffeee2222ffee88880fee22280feefff80fff0ff80f0f0ff80f0f0ff80f0f
// 003:efffffffff222222f8888888f8222222f8fffffff8fffffff8ff0ffff8ff0fff
// 004:fffffeee2222ffee88880fee22280feefff80ffffff80f0f0ff80f0f0ff80f0f
// 017:f8fffffff8888888f888f888f8888ffff8888888f2222222ff000fffefffffef
// 018:fff800ff88880ffef8880fee88880fee88880fee2222ffee000ffeeeffffeeee
// 019:f8fffffff8888888f888f888f8888ffff8888888f2222222ff000fffefffffef
// 020:fff800ff88880ffef8880fee88880fee88880fee2222ffee000ffeeeffffeeee
// </TILES>

// <WAVES>
// 000:00000000ffffffff00000000ffffffff
// 001:0123456789abcdeffedcba9876543210
// 002:0123456789abcdef0123456789abcdef
// </WAVES>

// <SFX>
// 000:000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000304000000000
// </SFX>

// <PALETTE>
// 000:140c1c44243430346d4e4a4e854c30346524d04648757161597dced27d2c8595a16daa2cd2aa996dc2cadad45edeeed6
// </PALETTE>
