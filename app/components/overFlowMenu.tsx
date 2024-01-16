import React from 'react'
import { FC } from 'react';
import Buttoncomponent from './button';
interface MenuProps {
    onEdit: () => void;
    onDelete: () => void;
}

const overFlowMenu: FC<MenuProps> = ({
    onEdit,
    onDelete,
}) => {
    return (
        <ul className="menu lg:menu-horizontal bg-base-200 rounded-box lg:mb-64">
            <li>
                <details open>
                    <summary>::</summary>
                    <ul>
                        <li><Buttoncomponent
                            text="Edit Note"
                            onClickAction={onEdit}
                            disabled={false}
                            className="bg-white font-bold text-yellow-500 hover:bg-yellow-300 hover:font-extrabold hover:text-white"
                        /></li>
                        <li><Buttoncomponent
                            text="Delete Note"
                            onClickAction={onDelete}
                            disabled={false}
                            className="bg-white font-bold text-red-700 hover:bg-red-700 hover:font-extrabold hover:text-white"
                        /></li>

                    </ul>
                </details>
            </li>
        </ul>
    )
}

export default overFlowMenu