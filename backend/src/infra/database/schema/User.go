package schema

import (
	"time"

	"github.com/uptrace/bun"
)

type Users struct {
    bun.BaseModel `bun:"table:users,alias:u"`
    ID         	int64       `bun:"id,pk,autoincrement"`
		Name       	string      `bun:"name,notnull"`
    Email      	string      `bun:"email,notnull"`
		CanSendMail bool        `bun:"can_send_mail,notnull"`
		UUID       	string      `bun:"uuid,notnull"`
		CreatedAt  	time.Time   `bun:"default:current_timestamp"`
		UpdatedAt  	time.Time   `bun:",nullzero"`
		DeletedAt  	time.Time   `bun:",soft_delete,nullzero"`
		Items			 	[]*Items     `bun:"rel:has-many,join:id=user_id"`
}
