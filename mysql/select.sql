-- sélectionner des enregistrements
-- choisir les clonnes
-- * sélection de toutes les comonnes
-- SELECT 
    -- client.secondname, client.email, client.city
    -- client.*  
-- FROM 
    -- komora_dev.client;
-- WHERE
    -- client.id = 2;    
-- jointure : sélectionner des données présentes dans pleusieurs tables en utilisant 

SELECT
    client.id,
    client.firstname,
    client.lastname,
    orders.totalprice,
    orders.date,
    GROUP_CONCAT(address.name) AS adresses
FROM
   komora_dev.client
JOIN  
    komora_dev.orders
ON 
    orders.client_id=client.id
JOIN
    komora_dev.address
JOIN
    komora_dev.client_address
ON
    client_address.client_id=client.id
AND   
    client_address.address_id=address.id   
GROUP BY
    client.id,
    client.firstname,
    client.lastname,
    orders.totalprice,
    orders.date
;
  
