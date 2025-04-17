import React, { useState } from "react";
import { Controller } from "react-hook-form";
import { Select, Option, Chip, Avatar } from "@material-tailwind/react";

const MultiSelectWithChips = ({ control, name, collections, defaultValues, setTags }) => {
  const [selectedValues, setSelectedValues] = useState(defaultValues || []);
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (value) => {
    if (!selectedValues.includes(value)) {
      // Si el valor ya está seleccionado, lo eliminamos
      setSelectedValues([...selectedValues, value]);

    } 
    setTags([...selectedValues, value]);
  };

  const handleRemoveChip = (value) => {
    setSelectedValues(selectedValues.filter((v) => v !== value));
    setTags(selectedValues.filter((v) => v !== value));
  };

  const getColor = (value) => {
    const index = collections.findIndex((collection) => collection.title === value);
    if (index === -1) return "gray";
    return collections[index].color;
  }

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={selectedValues}
      render={({ field }) => (
        <div>
          {/* Input personalizado para mostrar los chips */}
          <div
            onClick={() => setIsOpen(!isOpen)}
            style={{
              border: "1px solid #ccc",
              borderRadius: "4px",
              padding: "8px",
              cursor: "pointer",
              display: "flex",
              flexWrap: "wrap",
              gap: "4px",
            }}
          >
            {selectedValues.length === 0 && "Selecciona categorías"}
            {selectedValues.map((value) => (
              <Chip
                key={value}
                value={value}
                style={{  margin: "2px",backgroundColor: getColor(value) }}
                onClose={() => handleRemoveChip(value)}
              />
            ))}
          </div>

          {/* Select para elegir opciones */}
          {isOpen && (
            <Select
              open={isOpen}
              onClose={() => setIsOpen(false)}
              onChange={(value) => {
                handleSelect(value);
                console.log('Valor',value);
                field.onChange(selectedValues); // Actualiza el valor en react-hook-form
              }}
            >
                {
                    collections.map((collection) => (
                        <Option key={collection.id} value={collection.title}>
                            <Avatar src={collection.imgUrl} alt={collection.title} size="sm" />
                            {collection.title}
                        </Option>))
                }
            </Select>
          )}
        </div>
      )}
    />
  );
};

export default MultiSelectWithChips;