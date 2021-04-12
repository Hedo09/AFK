package hu.bme.aut.webshop.dao;

import hu.bme.aut.webshop.domain.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;

@Repository
@RepositoryRestResource
public interface CategoryRepository extends JpaRepository<Category, Long> {
}
