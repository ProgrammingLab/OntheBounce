# Androidからサーバーへの通信

## session_id

```input
{
	event: "session_id",
	data: {}
}
```

```output
{
	event: "session_id",
	data: {
		session_id
	},
	errors: []
}
```

key|type| value
---| --- | ---
session_id | integer | サーバー内でユーザーに与えられる一意なid


## create_room

```input
{
	event: "create_room",
	data: {
		session_id,
		round,
		hit_point
	}
}
```

key| type | value
---| --- | ---
session_id | integer | 部屋を作成する人のsession_id
round | integer | ゲームのラウンド数
hit_point | integer | ユーザーの体力

```output
{
	event: "create_room",
	data: {
		room_id
	},
	errors: []
}
```

key | type | value
--- | --- | ---
room_id | integer | サーバー内で部屋に与えられる一意なid

## join_room

```input
{
	event: "join_room",
	data: {
		session_id,
		room_id
	}
}
```

key | type | value
--- | ---- | -----
session_id | integer | 部屋に加わる人のsession_id
room_id | integer | 加わりたい部屋のroom_id

```output
{
	event: "join_room",
	data: {
		round,
		hit_point,
		team_id
	},
	errors: []
}
```

key | type | value
--- | ---- | -----
round | integer | その部屋のゲームのラウンド数
hit_point | integer | その部屋のゲームのユーザーの体力
team_id | integer | 0 or 1

## users

```input
{
	event: "users",
	data: {
		session_id
		room_id
	}
}
```

key | type | value
--- | ---- | -----
session_id | integer | 自分のsession_id
room_id | integer | 自分が参加している部屋のroom_id

```output
{
	event: "users",
	data: {
		users: [
			{
				session_id
				ready
			}
		]
	},
	errors: []
}
```

key | type | value
--- | ---- | -----
users | array | 部屋に参加しているユーザーの配列
session_id | integer | ユーザーのsession_id
ready | boolean | ゲーム開始の準備ができているか

---

## user_ready

```input
{
	event: "user_ready",
	data: {
		session_id
	}
}
```

key | type | value
--- | ---- | -----
session_id | integer | ゲーム開始の準備ができているユーザーのid

```output
{
	event: "user_ready",
	data: {},
	errors: []
}
```

## hitted

```input
{
	event: "hitted",
	data: {
		attack_session_id,
		hitted_session_id
	}
}
```


key | type | value
--- | ---- | -----
attack_session_id | integer | 攻撃したユーザーのid
hitted_session_id | integer | 攻撃されたユーザーのid

```output
{
	event: "hitted",
	data: {},
	errors: []
}
```


## user_dead

```input
{
	event: "user_dead",
	data: {
		session_id
	}
}
```
key | type | value
--- | ---- | -----
session_id | integer | 死んだユーザーのid

```output
{
	event: "user_dead",
	data: {},
	errors: []
}
```

## result


```input
{
	event: "result",
	data: {
		session_id
	}
}
```

key | type | value
--- | ---- | -----
session_id | integer | 結果を取得したいユーザーのsession_id

```output{
{	
	event: "result",
	data: {
		rounds: [
			{
				round
				hit_count
				hitted_count
			}
		]
	},
	errors: []
}
```


key | type | value
--- | ---- | -----
round | integer | 何ラウンド目か
hit_count | integer | 攻撃を当てた回数
hitted_count | integer | 攻撃を当てられた回数


# サーバーからAndroidへの通信

## game_start

```input{
{
	event: "game_start",
	data: {
		round
	}
}
```

key | type | value
--- | ---- | -----
round | integer | 何ラウンド目か

```output
{	
	event: "game_start",
	data: {},
	errors: []
}
```

## game_stop

```input
{
	event: "game_stop",
	data: {
		win_team_id
		next_round
	}
}
```

key | type | value
--- | ---- | -----
win_team_id | integer | 勝ったチームのid
next_round | integer | 終了した場合は，0 or -1で，それ以外は自然数


```output
{	
	event: "game_stop",
	data: {},
	errors: []
}
```
