# Frontend

## ADD
I funktionen actions/add-square.ts hanteras skapandet av en ny kub (square) och placeringen av den i rätt kolumn, samt kommunikationen med backend.

Färgval
Först definieras en lista med förvalda färger (colors). Därefter väljs en slumpmässig färg från listan och sparas i variabeln newColor.

Kolumnhantering
Jag hämtar alla befintliga kolumner med Object.keys() och räknar dem med columnsCount. Därefter bestäms var den nya kuben ska placeras med hjälp av targetColumn och targetRow.

Placering – tre möjliga fall
Innan kuben skapas kontrollerar funktionen följande scenarier med en if-sats:

Inga kolumner finns – då skapas en första kolumn ("0").
Alla kolumner har lika många rutor som antal kolumner – en ny kolumn skapas.
Annars – kuben placeras i den kolumn som har minst antal rutor.

Skapa och spara kuben
När rätt plats är bestämd skapas ett nytt square-objekt med:
* Slumpmässig färg
* Kolumn- och radposition
* Ett unikt ID

## DELETE
I funktionen actions/clear-square.ts hanteras async med enkelt DELETE från backend.

## GET 
I funktionen actions/fetch-squares hanteras GET metoden för att fetcha alla squares.

## UI
- UI:n är skapad i App.tsx. Det viktiga att kolla på är hur jag renderar columns och rows.
  
```
{Object.keys(squares).map(column => (
  <div key={column} className="flex flex-col items-center">
    {squares[column].map((square, index) => (
      <div
        key={`${column}-${index}`}
        className="w-16 h-16 m-1 border border-black rounded"
        style={{ backgroundColor: square.color }}
      />
    ))}
  </div>
))}
```
Koden mapar ut alla squares uppdelade i kolumner, själva squares är objektet med 
en nyckel med en indivudell nyckel. ex 0 1 2 etc. 



Backend med .NET
Simpel backend uppdelat i Controllers, Models.

Models skapar själva modelen för square. 
Controllers skapar vi routen med http request bla. GET , POST , DELETE






