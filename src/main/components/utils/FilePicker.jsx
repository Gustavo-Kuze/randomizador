import React, { useState } from 'react';
import { Tooltip } from 'reactstrap';

const FilePicker = ({
  id,
  isPictureUpload,
  onPicked,
  text,
  tooltip,
  className,
  accept,
  labelClassName,
}) => {
  const [isTooltipOpen, toggleTooltip] = useState();

  const filePicked = () => {
    try {
      const input = document.getElementById(id || 'file-upload');
      if (isPictureUpload) {
        // reader.readAsDataURL(input.files[0])
        onPicked(input.files[0]);
      } else {
        const reader = new FileReader();
        reader.readAsText(input.files[0], 'ISO-8859-4');
        reader.onload = e => onPicked(e.target.result);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <label
        id={`${id || 'file-upload'}-label`}
        className={`custom-file-label btn btn-outline-primary px-5 ${labelClassName}`}
        htmlFor={id || 'file-upload'}
      >
        {text || 'Escolher arquivo'}
      </label>
      <Tooltip
        placement="bottom"
        isOpen={isTooltipOpen}
        target={`${id || 'file-upload'}-label`}
        toggle={() => toggleTooltip(!isTooltipOpen)}
      >
        {tooltip || 'Carregar arquivo do computador'}
      </Tooltip>
      <input
        id={id || 'file-upload'}
        type="file"
        className={`custom-file-input invisible ${className}`}
        onChange={() => filePicked()}
        accept={`${isPictureUpload ? '.png' : '.txt'}${accept || ''}`}
      />
    </>
  );
};

export default FilePicker;
