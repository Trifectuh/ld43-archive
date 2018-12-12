-- title:  Raycast Lua
-- author: jwash
-- desc:   a raycast engine in lua
-- script: lua

screen = {
	width = 240,
	height = 136
}

worldMap = {
	{1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1},
	{1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1},
	{1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1},
	{1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1},
	{1, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 0, 0, 0, 0, 3, 0, 3, 0, 3, 0, 0, 0, 1},
	{1, 0, 0, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1},
	{1, 0, 0, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0, 0, 3, 0, 0, 0, 3, 0, 0, 0, 1},
	{1, 0, 0, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1},
	{1, 0, 0, 0, 0, 0, 2, 2, 0, 2, 2, 0, 0, 0, 0, 3, 0, 3, 0, 3, 0, 0, 0, 1},
	{1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1},
	{1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1},
	{1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1},
	{1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1},
	{1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1},
	{1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1},
	{1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1},
	{1, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1},
	{1, 4, 0, 4, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1},
	{1, 4, 0, 0, 0, 0, 5, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1},
	{1, 4, 0, 4, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1},
	{1, 4, 0, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1},
	{1, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1},
	{1, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1},
	{1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1}
}

player = {
	pos = {
		x = 22,
		y = 11
	},
	dir = {
		x = -1,
		y = 0
	},
	cam = {
		x = 0,
		y = 0.66
	},
	mapPos = {
		x = 22,
		y = 11
	},
	moveSpeed = 5,
	rotationSpeed = 3
}

timer = {
	current = 0,
	old = 0,
	lastFrame = 0
}

ray = {
	dir = {
		x = 0,
		y = 0
	},
	dist = {
		x = 0,
		y = 0,
		dx = 0,
		dy = 0,
		perp = 0
	},
	step = {
		x = 1,
		y = 1
	},
	mapPos = {
		x = 22,
		y = 11
	},
	wall = {
		hit = false,
		side = 1
	}
}

column = {
	top = 0,
	height = 0,
	bottom = 0,
	color = 0
}

function TIC()
	cls()

	rect(0, 0, 240, 68, 13)
	rect(0, 69, 240, 136, 12)

	for x = 0, screen.width, 1 do
		createRay(x)

		setPlayerMapPosition()
		setRayMapPosition()
		calculateRayDistance()
		calculateRayStepSize()

		ray.wall.hit = false
		while (ray.wall.hit == false) do
			findWall()
		end

		calculateWallDistance()
		calculateColumnHeight()
		drawColumn(x)
	end

	updateFpsCounter()
	movePlayer()
end

function createRay(x)
	local cameraX = (2 * x) / screen.width - 1
	ray.dir.x = player.dir.x + player.cam.x * cameraX
	ray.dir.y = player.dir.y + player.cam.y * cameraX
end

function setPlayerMapPosition()
	player.mapPos.x = math.floor(player.pos.x)
	player.mapPos.y = math.floor(player.pos.y)
end

function setRayMapPosition()
	ray.mapPos.x = math.floor(player.pos.x)
	ray.mapPos.y = math.floor(player.pos.y)
end

function calculateRayDistance()
	ray.dist.dx = math.abs(1 / ray.dir.x)
	ray.dist.dy = math.abs(1 / ray.dir.y)
end

function calculateRayStepSize()
	if (ray.dir.x < 0) then
		ray.step.x = -1
		ray.dist.x = (player.pos.x - player.mapPos.x) * ray.dist.dx
	else
		ray.step.x = 1
		ray.dist.x = (player.mapPos.x + 1.0 - player.pos.x) * ray.dist.dx
	end
	if (ray.dir.y < 0) then
		ray.step.y = -1
		ray.dist.y = (player.pos.y - player.mapPos.y) * ray.dist.dy
	else
		ray.step.y = 1
		ray.dist.y = (player.mapPos.y + 1.0 - player.pos.y) * ray.dist.dy
	end
end

function findWall()
	if (ray.dist.x < ray.dist.y) then
		ray.dist.x = ray.dist.x + ray.dist.dx
		ray.mapPos.x = ray.mapPos.x + ray.step.x
		ray.wall.side = 0
	else
		ray.dist.y = ray.dist.y + ray.dist.dy
		ray.mapPos.y = ray.mapPos.y + ray.step.y
		ray.wall.side = 1
	end

	if (worldMap[ray.mapPos.x][ray.mapPos.y] > 0) then
		ray.wall.hit = true
		return
	end
end

function calculateWallDistance()
	if (ray.wall.side == 0) then
		ray.dist.perp = (ray.mapPos.x - player.pos.x + (1 - ray.step.x) / 2) / ray.dir.x
	else
		ray.dist.perp = (ray.mapPos.y - player.pos.y + (1 - ray.step.y) / 2) / ray.dir.y
	end
end

function calculateColumnHeight()
	column.height = screen.height / ray.dist.perp

	column.top = -column.height / 2 + screen.height / 2
	if (column.top < 0) then
		column.top = 0
	end

	column.bottom = column.height / 2 + screen.height / 2
	if (column.bottom >= screen.height) then
		column.bottom = screen.height - 1
	end
end

function drawColumn(x)
	column.color = worldMap[ray.mapPos.x][ray.mapPos.y]

	if (ray.wall.side == 1) then
		column.color = column.color + 5
	end

	line(x, column.top, x, column.bottom, column.color)
end

function updateFpsCounter()
	timer.old = timer.current
	timer.current = time()
	timer.lastFrame = (timer.current - timer.old) / 1000.0
	print(math.floor(1.0 / timer.lastFrame))
end

function movePlayer()
	local moveSpeedDelta = timer.lastFrame * player.moveSpeed
	local rotationSpeedDelta = timer.lastFrame * player.rotationSpeed

	if (btn(0)) then
		if (worldMap[math.floor(player.pos.x + player.dir.x * moveSpeedDelta)][math.floor(player.pos.y)] == 0) then
			player.pos.x = player.pos.x + (player.dir.x * moveSpeedDelta)
		end
		if (worldMap[math.floor(player.pos.x)][math.floor(player.pos.y + player.dir.y * moveSpeedDelta)] == 0) then
			player.pos.y = player.pos.y + (player.dir.y * moveSpeedDelta)
		end
	end

	if (btn(1)) then
		if (worldMap[math.floor(player.pos.x - player.dir.x * moveSpeedDelta)][math.floor(player.pos.y)] == 0) then
			player.pos.x = player.pos.x - (player.dir.x * moveSpeedDelta)
		end
		if (worldMap[math.floor(player.pos.x)][math.floor(player.pos.y - player.dir.y * moveSpeedDelta)] == 0) then
			player.pos.y = player.pos.y - (player.dir.y * moveSpeedDelta)
		end
	end

	if (btn(2)) then
		local oldDirX = player.dir.x
		player.dir.x = player.dir.x * math.cos(rotationSpeedDelta) - player.dir.y * math.sin(rotationSpeedDelta)
		player.dir.y = oldDirX * math.sin(rotationSpeedDelta) + player.dir.y * math.cos(rotationSpeedDelta)

		local oldPlaneX = player.cam.x
		player.cam.x = player.cam.x * math.cos(rotationSpeedDelta) - player.cam.y * math.sin(rotationSpeedDelta)
		player.cam.y = oldPlaneX * math.sin(rotationSpeedDelta) + player.cam.y * math.cos(rotationSpeedDelta)
	end

	if (btn(3)) then
		local oldDirX = player.dir.x
		player.dir.x = player.dir.x * math.cos(-rotationSpeedDelta) - player.dir.y * math.sin(-rotationSpeedDelta)
		player.dir.y = oldDirX * math.sin(-rotationSpeedDelta) + player.dir.y * math.cos(-rotationSpeedDelta)

		local oldPlaneX = player.cam.x
		player.cam.x = player.cam.x * math.cos(-rotationSpeedDelta) - player.cam.y * math.sin(-rotationSpeedDelta)
		player.cam.y = oldPlaneX * math.sin(-rotationSpeedDelta) + player.cam.y * math.cos(-rotationSpeedDelta)
	end
end

-- <TILES>
-- 001:efffffffff222222f8888888f8222222f8fffffff8ff0ffff8ff0ffff8ff0fff
-- 002:fffffeee2222ffee88880fee22280feefff80fff0ff80f0f0ff80f0f0ff80f0f
-- 003:efffffffff222222f8888888f8222222f8fffffff8fffffff8ff0ffff8ff0fff
-- 004:fffffeee2222ffee88880fee22280feefff80ffffff80f0f0ff80f0f0ff80f0f
-- 017:f8fffffff8888888f888f888f8888ffff8888888f2222222ff000fffefffffef
-- 018:fff800ff88880ffef8880fee88880fee88880fee2222ffee000ffeeeffffeeee
-- 019:f8fffffff8888888f888f888f8888ffff8888888f2222222ff000fffefffffef
-- 020:fff800ff88880ffef8880fee88880fee88880fee2222ffee000ffeeeffffeeee
-- </TILES>

-- <WAVES>
-- 000:00000000ffffffff00000000ffffffff
-- 001:0123456789abcdeffedcba9876543210
-- 002:0123456789abcdef0123456789abcdef
-- </WAVES>

-- <SFX>
-- 000:000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000304000000000
-- </SFX>

-- <PALETTE>
-- 000:140c1c44243430346d4e4a4e854c30346524d04648757161597dced27d2c8595a16daa2cd2aa996dc2cadad45edeeed6
-- </PALETTE>

