import React, { FC } from "react";
import Buttoncomponent from "./button";

interface CardProps {
  title: string;
  body: string;
  id: number;
  onOpen: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

const AccordionCard: FC<CardProps> = ({
  title,
  body,
  id,
  onOpen,
  onEdit,
  onDelete,
}) => {
  return (
    <div tabIndex={id} className="collapse collapse-arrow mt-2 w-3/4 ">
      <input type="checkbox" />

      <div className="collapse-title text-xl sm:text-xl font-medium flex justify-between bg-gray-300 flex-row">
        <div className="justify-end">{title.toUpperCase()}</div>

      </div>

      <div className="flex flex-col collapse-content text-xl sm:text-xl justify-center bg-gray-200">
        <p className="font-extralight mt-6 mx-4" dangerouslySetInnerHTML={{ __html: body }} />

        <div className="flex justify-end mr-8 mt-8 mb-4 gap-6">
          <Buttoncomponent
            text="Edit Note"
            onClickAction={onEdit}
            disabled={false}
            className="bg-white font-bold text-yellow-500 hover:bg-yellow-300 hover:font-extrabold hover:text-white"
          />
          <Buttoncomponent
            text="Delete Note"
            onClickAction={onDelete}
            disabled={false}
            className="bg-white font-bold text-red-700 hover:bg-red-700 hover:font-extrabold hover:text-white"
          />
        </div>
      </div>
    </div>
  );
};

export default AccordionCard;