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
    user.id,
    user.firstname,
    user.lastname,
    orders.totalprice,
    orders.date,
    GROUP_CONCAT(address.name) AS adresses
FROM
   komora_dev.user
JOIN  
    komora_dev.orders
ON 
    orders.client_id=client.id
JOIN
    komora_dev.address
JOIN
    komora_dev.user_address
ON
    user_address.client_id=user.id
AND   
    user_address.address_id=address.id   
GROUP BY
    user.id,
    user.firstname,
    user.lastname,
    order.totalprice,
    order.date
;
  
