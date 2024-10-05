import React, { useState } from 'react';
import parse from 'html-react-parser';

import {
    Button,
  } from "@material-tailwind/react";


const ExpandableContent = ({ htmlContent, wordLimit=200 }) => {
  const [expanded, setExpanded] = useState(false);

  // Función para contar palabras
  const countWords = (str) => {
    return str.split(/\s+/).length;
  };

  // Función para truncar el contenido a las primeras 200 palabras
  const truncateContent = (html, wordLimit) => {
    const div = document.createElement('div');
    div.innerHTML = html;
    let truncated = '';
    let wordCount = 0;
    let truncatedFlag = false;

    const traverseNodes = (node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        const words = node.textContent.split(/\s+/);
        if (wordCount + words.length > wordLimit) {
          truncated += words.slice(0, wordLimit - wordCount).join(' ') + ' ';
          wordCount = wordLimit;
          truncatedFlag = true;
        } else {
          truncated += node.textContent + ' ';
          wordCount += words.length;
        }
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        truncated += `<${node.nodeName.toLowerCase()}`;
        for (let i = 0; i < node.attributes.length; i++) {
          const attr = node.attributes[i];
          truncated += ` ${attr.name}="${attr.value}"`;
        }
        truncated += '>';
        for (let i = 0; i < node.childNodes.length; i++) {
          traverseNodes(node.childNodes[i]);
          if (wordCount >= wordLimit) break;
        }
        truncated += `</${node.nodeName.toLowerCase()}...>`;
      }
    };

    traverseNodes(div);
    if (truncatedFlag) {
        truncated = truncated.trim() + '...';
    }
    return truncated;
  };

  const truncatedContent = truncateContent(htmlContent, wordLimit);
  const isTruncated = countWords(htmlContent) > wordLimit;

  return (
    <div className="container mx-auto w-4/5 mt-5 mb-5">
        <div className='font-ProximaNovaRegular'>
            {parse(expanded ? htmlContent : truncatedContent)}
        </div>
      {isTruncated && (
        <div style={{display:'flex', justifyContent:'flex-end'}} >
            <Button 
                variant="contained" 
                className="font-ProximaNovaRegular"
                size="sm"
                onClick={() => setExpanded(!expanded)}
                style={
                    {
                        backgroundColor: '#087e94',
                        textTransform:'none',
                        color: 'white',
                        fontSize:'16px',
                        lineHeight:'2',
                        padding: '5px 15px',
                        marginTop:'10px',
                        borderRadius: '20px',

                    }}
            >
            {expanded ? 'View less' : 'Read more'}
            </Button>
        </div>
      )}
    </div>
  );
};

export default ExpandableContent;