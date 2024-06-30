package entity

import "encoding/json"

type User struct {
	Id        uint64 `redis:"id"`
	Email     string `redis:"email"`
	Username  string `redis:"username"`
	Password  string `redis:"password"`
	PhotoPath string `redis:"photo"`
}

func (u User) MarshalBinary() ([]byte, error) {
	return json.Marshal(&u)
}

func (u *User) UnmarshalBinary(data []byte) error {
	return json.Unmarshal(data, u)
}