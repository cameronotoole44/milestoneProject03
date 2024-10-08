"""added quantity to user_powerups

Revision ID: 42b22058f358
Revises: 28712e8044da
Create Date: 2024-09-19 17:53:57.330512

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '42b22058f358'
down_revision: Union[str, None] = '28712e8044da'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user_powerup', schema=None) as batch_op:
        batch_op.add_column(sa.Column('quantity', sa.Integer(), nullable=True))

    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user_powerup', schema=None) as batch_op:
        batch_op.drop_column('quantity')

    # ### end Alembic commands ###